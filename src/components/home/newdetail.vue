<template>
  <div class="newdetail">
    <h4>{{ newDetail.title }}</h4>
    <div class="timeclick">
      <span>发表时间: {{newDetail.add_time | dateformat}}</span>
      <span>点击次数: {{newDetail.click}}</span>
    </div>
    <div v-html="newDetail.content"></div>
    <comment :parentId="id"></comment>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import comment from "../comment.vue";
export default {
  created() {
    this.getNewDetail();
  },
  data() {
    return {
      id: this.$route.params.id,
      newDetail: {}
    };
  },
  methods: {
    getNewDetail() {
      this.$http.get("api/getnew/" + this.id).then(
        response => {
          this.newDetail = response.data.message[0];
        },
        response => {
          Toast({
            message: "获取消息失败",
            position: "bottom",
            duration: 5000
          });
        }
      );
    }
  },
  components: {
    comment
  }
};
</script>

<style lang="scss" >
.newdetail {
  h4 {
    text-align: center;
    color: red;
    font-size: 16px;
  }
  .timeclick {
    display: flex;
    justify-content: space-between;
    padding: 5px;
    font-size: 12px;
    color: #226aff;
    border-bottom: 1px gray solid;
    margin-bottom: 5px;
  }
}
</style>