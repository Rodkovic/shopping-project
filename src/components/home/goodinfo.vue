<template>
  <div class="goodcontainer">
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-on:after-leave="afterLeave"
    >
      <div class="ball" v-show="flag" ref="ball"></div>
    </transition>

    <!-- 轮播图 -->
    <div class="mylunbo">
      <lunbo :list="list" :full="false"></lunbo>
    </div>

    <!-- 价格信息加入购物车 -->
    <div class="goodinfo">
      <h3 class="goodtitle">{{goodinfo.title}}</h3>

      <div class="goodinfo-content">
        <div>
          <span class="oldselltitle">市场价:</span>
          <span class="oldsell">¥{{goodinfo.market_price}}</span>
          <span class="newselltitle">销售价:</span>
          <span class="newsell">¥{{goodinfo.sell_price}}</span>
        </div>
        <div class="buycount">
          <span>购买数量</span>
          <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9">
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input @change="numChange" class="mui-input-numbox" type="number" />
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
          </div>
        </div>
        <div>
          <mt-button type="primary" size="small">立即购买</mt-button>
          <mt-button type="danger" size="small" @click="addCar" :disabled="btnflag">加入购物车</mt-button>
        </div>
      </div>
    </div>

    <!-- 商品参数 -->
    <div class="goodparams">
      <h3 class="params-title">商品参数</h3>
      <div class="params-list">
        <p>商品货号: {{goodinfo.goods_no}}</p>
        <p>库存情况: {{goodinfo.stock_quantity}}件</p>
        <p>上架时间: {{goodinfo.add_time | dateformat}}</p>
      </div>
      <div class="params-btn">
        <mt-button size="large" type="primary" plain>图文介绍</mt-button>
        <mt-button class="btn-comment" size="large" type="danger" plain>商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
import lunbo from "../lunbo.vue";
export default {
  created() {
    this.getlunbo();
    this.getGoodinfo();
  },
  mounted() {
    mui(".mui-numbox").numbox();
  },
  data() {
    return {
      id: this.$route.params.id,
      list: [],
      goodinfo: {},
      flag: false,
      btnflag: false,
      goodcount: 1 
    };
  },
  methods: {
    getlunbo() {
      this.$http.get("api/getthumimages/" + this.id).then(
        response => {
          let reqList = response.body.message;
          reqList.forEach((item, i) => {
            let newItem = { img: item.src, id: i };
            this.list.push(newItem);
          });
        },
        response => {}
      );
    },
    getGoodinfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(
        response => {
          this.goodinfo = response.data.message[0];
        },
        response => {}
      );
    },
    numChange(value) {
      this.goodcount = mui(".mui-numbox").numbox().getValue();
    },
    addCar() {
      this.btnflag = true;
      this.flag = !this.flag;
      this.$store.commit('addCar',{
        id: this.goodinfo.id,
        count: this.goodcount,
        selected: false,
        price: this.goodinfo.sell_price
      })
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      //不写 el.offsetWidth 动画无法执行
      el.offsetWidth;

      const ballPosition = this.$refs.ball.getBoundingClientRect();
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      const x = badgePosition.left - ballPosition.left;
      const y = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${x}px,${y}px)`;
      el.style.transition = "all .3s ease";
      done();
    },
    afterEnter(el) {
      this.flag = !this.flag;
    },
    afterLeave(el) {
      this.btnflag = false;
    }
  },
  components: {
    lunbo
  }
};
</script>

<style lang="scss">
.goodcontainer {
  background-color: #eee;
  padding: 10px;
  position: relative;

  .ball {
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    top: 333px;
    left: 133px;
    z-index: 99;
  }

  // 轮播图
  .mylunbo {
    padding: 10px 0;
    box-shadow: 0 0 8px #ccc;
    background-color: #fff;
  }

  // 商品价格 加入购物车
  .goodinfo {
    box-shadow: 0 0 8px #ccc;
    background-color: #fff;
    font-size: 14px;

    .goodtitle {
      padding-left: 10px;
      font-size: 16px;
      font-weight: normal;
      border-bottom: 1px solid #ccc;
      line-height: 40px;
    }

    .goodinfo-content {
      padding: 10px;

      .oldsell {
        text-decoration: line-through;
      }
      .newselltitle {
        margin-left: 10px;
      }
      .newsell {
        color: red;
        font-size: 16px;
      }

      .buycount {
        margin-top: 10px;
        margin-bottom: 10px;
      }
    }
  }

  // 商品参数
  .goodparams {
    box-shadow: 0 0 8px #ccc;
    background-color: #fff;
    font-size: 14px;
    .params-title {
      padding-left: 10px;
      font-size: 16px;
      font-weight: normal;
      border-bottom: 1px solid #ccc;
      line-height: 40px;
    }
    .params-list {
      padding: 10px;
    }

    .params-btn {
      padding: 20px;
      border-top: 1px solid #ccc;
      .btn-comment {
        margin-top: 20px;
      }
    }
  }
}
</style>