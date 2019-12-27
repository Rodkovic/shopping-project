<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newlist" :key="item.id">
        <router-link :to="'/home/newlist/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            {{item.title}}
            <p class="mui-ellipsis">
              <span>发表时间:{{item.add_time | dateformat}}</span>
              <span>点击次数:{{item.click}}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  created() {
    this.getNewList();
  },
  data() {
    return {
      newlist: []
    };
  },
  methods: {
    getNewList() {
      this.$http.get("api/getnewslist").then(
        response => {
          this.newlist = response.body.message;
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
  }
};
</script>

<style lang="scss">
.mui-media-body {
    font-size: 14px;

    .mui-ellipsis{
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        color: #226aff;
    }
}

</style>