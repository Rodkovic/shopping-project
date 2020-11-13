<template>
  <div class="comment">
    <h4 class="title">发表评论</h4>
    <textarea placeholder="请输入评论内容(最多120字)" v-model="content"></textarea>
    <mt-button type="primary" size="large" class="button" @click="addComment">发表评论</mt-button>
    <div v-for="(item,i) in commentList" :key="item.id">
      <div class="userInfo">第{{i+1}}楼 用户:{{item.user_name}} 发表时间:{{item.add_time | dateformat}}</div>
      <div class="usermessage">{{item.content}}</div>
    </div>
    <mt-button type="danger" plain size="large" class="button" @click="loadMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  created() {
    this.getComment();
  },
  data() {
    return {
      commentList: [],
      content: "",
      pageindex: 1
    };
  },
  props: ["parentId"],
  methods: {
    getComment() {
      this.$http
        .get("api/getcomments/" + this.parentId + "?pageindex=" + this.pageindex)
        .then(
          response => {
            this.commentList = this.commentList.concat(response.data.message);
          },
          response => {}
        );
    },
    loadMore() {
      this.pageindex++;
      this.getComment();
    },
    addComment() {
      if (this.content.trim() != "") {
        this.$http
          .post("api/postcomment/" + this.parentId, {
            content: this.content.trim()
          })
          .then(
            response => {
              this.commentList.unshift({
                user_name: "匿名用户",
                add_time: Date.now(),
                content: this.content.trim()
              });
              this.content = "";
            },
            response => {
              Toast({
                message: "评论失败",
                position: "bottom",
                duration: 5000
              });
            }
          );
      } else {
        Toast({
          message: "请输入评论内容",
          position: "bottom",
          duration: 5000
        });
      }
    }
  }
};
</script>

<style lang="scss">
.comment {
  .title {
    text-align: left;
    font-size: 18px;
    color: black;
    border-bottom: 1px solid gray;
    padding-bottom: 10px;
  }
  textarea {
    font-size: 12px;
    height: 90px;
    margin: 0;
    padding: 10px;
  }
  .button {
    margin-bottom: 5px;
  }
  .userInfo {
    font-size: 12px;
    background: #dee1e6;
    width: 100%;
    line-height: 30px;
  }
  .usermessage {
    padding: 5px;
    font-size: 12px;
  }
}
</style>