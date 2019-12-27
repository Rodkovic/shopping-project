<template>
  <div class="comment">
      <h4 class="title">发表评论</h4>
      <textarea placeholder="请输入评论内容(最多120字)"></textarea>
      <mt-button type="primary" size="large" class="button">发表评论</mt-button>
      <div v-for="(item,i) in commentList" :key="item.id">
          <div class="userInfo">第{{i+1}}楼 用户:{{item.user_name}} 发表时间:{{item.add_time}}</div>
          <div class="usermessage">{{item.content}}</div>
      </div>
  </div>
</template>

<script>
export default {
    created() {
        this.getComment();
    },
    data() {
        return {
            commentList: []
        }
    },
    props : ['parentId'],
    methods: {
        getComment() {
            this.$http.get('api/getcomments/'+ this.parentId +'?pageindex=1').then(
                response => {
                    this.commentList = response.body.message;
                },
                response => {

                }
            )
        }
    }
}
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
        background: #DEE1E6;
        width: 100%;
        line-height: 30px;
    }
    .usermessage {
        padding: 5px;
        font-size: 12px;
    }
}

</style>