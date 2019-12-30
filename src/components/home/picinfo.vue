<template>
  <div class="picInfo">
    <h3>{{picInfo.title}}</h3>
    <div class="timeclick">
      <span>发表时间:{{picInfo.add_time | dateformat}}</span>
      <span>点击次数:{{picInfo.click}}</span>
    </div>
    <vue-preview :slides="piclist" @close="handleClose"></vue-preview>
    <div v-html="picInfo.content" class="content"></div>
    <comment :parentId="id"></comment>
  </div>
</template>

<script>
import comment from "../comment.vue";
export default {
  created() {
    this.getPicInfo();
    this.getPicList();
  },
  data() {
    return {
      id: this.$route.params.id,
      picInfo: {},
      piclist: []
    };
  },
  methods: {
    getPicInfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(
        response => {
          this.picInfo = response.body.message[0];
        },
        response => {}
      );
    },
    getPicList() {
      this.$http.get("api/getthumimages/" + this.id).then(
        response => {
          let list = response.body.message;
          list.forEach((item, i) => {
            item.w = 600;
            item.h = 600;
            item.msrc = item.src;
          });
          this.piclist = list;
          console.log(this.piclist);
        },
        response => {}
      );
    },
    handleClose() {
      console.log("close event");
    }
  },
  components: {
    comment
  }
};
</script>

<style lang="scss" >
.picInfo {
  padding: 10px;
  h3 {
    font-size: 16px;
    text-align: center;
    color: #226aff;
    margin: 10px;
  }
  .timeclick {
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
    border-bottom: 1px solid gray;
  }
  .content {
    font-size: 14px;
    line-height: 30px;
  }
}

.my-gallery {
  img {
    width: 100px;
    height: 100px;
    box-shadow:0 0 8px #999;
  }
  figure {
    margin: 9px;
    width: 100px;
    display: inline-block;
  }
}
</style>