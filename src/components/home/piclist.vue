<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', i == 0 ? 'mui-active' : '']"
            v-for="(item,i) in categoryList"
            :key="item.id"
            @tap="getCategoryDetail(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>

    <div>
      <ul class="piclistUl">
        <router-link tag="li" v-for="item in picList" :key="item.id" :to="'/home/piclist/'+item.id">
          <img v-lazy="item.img_url" />
          <div class="pic_content">
            <h3>{{item.title}}</h3>
            <p>{{item.zhaiyao}}</p>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";
export default {
  created() {
    this.getCategory();
  },
  mounted() {
    // 需要在组件的 mounted 事件钩子中，注册 mui 的 scroll 滚动事件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  data() {
    return {
      categoryList: [],
      categoryId: 0,
      picList: []
    };
  },
  methods: {
    getCategory() {
      this.$http.get("api/getimgcategory").then(
        response => {
          this.categoryList = response.body.message;
          this.categoryId = this.categoryList[0].id;
          this.getCategoryDetail(this.categoryId);
        },
        response => {}
      );
    },
    getCategoryDetail(id) {
      this.$http.get("api/getimages/" + id).then(
        response => {
          this.picList = response.body.message;
        },
        response => {}
      );
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}

.piclistUl {
  padding: 0;
  margin: 0;
  background-color: #ccc;
  li {
    list-style: none;
    padding: 10px 10px 0px 10px;
    text-align: center;
    position: relative;

    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .pic_content {
      position: absolute;
      bottom: 0;
      background-color: rgba($color: #000, $alpha: 0.4);
      text-align: left;
      margin-right: 10px;
      h3 {
        width: 100%;
        color: white;
        font-size: 14px;
      }
      p {
        color: white;
        font-size: 12px;
        // max-height: 60px;
        // overflow: hidden;
        // text-overflow: ellipsis;
        width: 100%;
        margin: 0;
        overflow: hidden;
        display: -webkit-box; /*将对象作为弹性伸缩盒子模型显示。*/
        -webkit-line-clamp: 3; /*设置需要显示的行数*/
        -webkit-box-orient: vertical; /*设置伸缩盒子的子元素排列方式(从上到下垂直排列)*/
      }
    }
  }
}
</style>