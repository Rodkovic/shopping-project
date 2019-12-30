<template>
  <div class="goodlist">
    <div class="goodstyle" v-for="item in goodlist" :key="item.id" @click="goInfo(item.id)">
      <img :src="item.img_url" />
      <h3>{{item.title}}</h3>
      <div class="goodcontent">
        <div>
          <span class="new-price">¥{{item.sell_price}}</span>
          <span class="old-price">¥{{item.market_price}}</span>
        </div>
        <div class="goodcount">
          <span>热卖中</span>
          <span>剩余{{item.stock_quantity}}件</span>
        </div>
      </div>
    </div>

    <mt-button type="danger" plain size="large" class="button" @click="loadMore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  created() {
    this.getGoodList();
  },
  data() {
    return {
      goodlist: [],
      pageindex: 1
    };
  },
  methods: {
    getGoodList() {
      this.$http.get("api/getgoods?pageindex=" + this.pageindex).then(
        response => {
          this.goodlist = this.goodlist.concat(response.body.message);
        },
        response => {}
      );
    },
    loadMore() {
      this.pageindex+=1;
      this.getGoodList();
    },
    goInfo(id) {
        this.$router.push({ name: 'goodinfo', params: { id }})
    }
  }
};
</script>

<style lang="scss">
.goodlist {
  padding: 10px 10px 0px 10px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .goodstyle {
    width: 49%;
    box-shadow: 0 0 8px #ccc;
    margin-bottom: 10px;
    h3 {
      padding: 2px;
      font-size: 16px;
      height: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    img {
      width: 100%;
    }

    .goodcontent {
      background-color: #ccc;
      margin: 2px;
      padding-top: 5px;
      .new-price {
        color: red;
        font-size: 16px;
        font-weight: 700;
        margin-left: 5px;
      }
      .old-price {
        text-decoration: line-through;
        font-size: 14px;
        margin-left: 10px;
      }

      .goodcount {
        display: flex;
        padding: 5px;
        justify-content: space-between;
        font-size: 14px;
      }
    }
  }
}
</style>