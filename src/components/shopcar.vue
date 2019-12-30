<template>
  <div class="shop-car-container">
      <div class="carlist" v-for="item in carList" :key="item.id">
        <mt-switch :id="'switch' + item.id" v-model="item.selected" @change="checkChange(item.id)"></mt-switch>
        <img :src="item.thumb_path">
        <div class="content">
          <h3>{{item.title}}</h3>
          <div>

            <span class="price">¥{{item.price}}</span>

            <numbox :count="item.count" :id="item.id"></numbox>

            <a href="javascrpit:(0)" @click.prevent="deleteItem(item.id)">删除</a>

          </div>
        </div>
      </div>

      <div class="amount">
        <div class="amount-price">
          <span>总计(不含运费)</span>
          <span>已勾选商品<span class="amountred">{{$store.getters.getCarAmount.count}}</span>件,总价<span class="amountred">¥ {{$store.getters.getCarAmount.price}}</span></span>
        </div>
        <mt-button type="danger" size="normal">去结算</mt-button>
      </div>
  </div>
</template>

<script>
import numbox from './numbox.vue'
export default {
  created() {
    this.getCarList();
  },
  data() {
    return {
      carList: [],
    }
  },
  components:{
    numbox
  },
  methods: {
      getCarList() {
        //记录了商品id 和 选择数量的 购物车对象信息
        let publicCarList = this.$store.getters.getCarList;
        let carNumList = this.$store.getters.getCarNumList;
        if(carNumList.length < 1){
          return;
        }
        this.$http.get('api/goods/getshopcarlist/' + carNumList)
        .then(
          response => {
            var carDatas = response.body.message;
            
            publicCarList.forEach(item => {
              let cardata = {};
              carDatas.some(reqitem =>{
                if(reqitem.id == item.id){
                  cardata.count = item.count
                  cardata.selected = item.selected
                  cardata.price = item.price
                  cardata.id = reqitem.id
                  cardata.title = reqitem.title
                  cardata.thumb_path = reqitem.thumb_path
                  return true
                }
              }) 
              this.carList.push(cardata)
            })

          }
        )
      },
      checkChange(id){
        let switchDom = document.getElementById('switch' + id);
        let isSelected = switchDom.getElementsByTagName('input')[0].checked
        console
      
        this.carList.some( (item,i) => {
          if(item.id == id){
            this.carList[i].selected = isSelected;
            this.$store.commit('updateCarCheck',{
              id: item.id,
              selected: isSelected
            });
            return true
          }
        })
        
      },
      deleteItem(id) {
        this.carList.some( (item,i) => {
          if(item.id == id){
            this.carList.splice(i,1);
            return true
          }
        })
        this.$store.commit('deleteCar',id);
      }
  },
}
</script>

<style lang="scss">
.shop-car-container {
  background-color: #eee;
  padding: 1px;
  .carlist {
    margin: 10px;
    background-color: #fff;
    padding: 10px;
    box-shadow: 0 0 8px #ccc;
    display: flex;

    img {
      width: 50px;
    }

    .content {
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      h3 {
        font-size: 14px;
      }
      .price {
        color: red;
        font-size: 14px;
      }
      .mui-numbox {
        height: 25px;
      }

      a {
        font-size: 14px;
      }
    }
  }

  .amount {
    background: #fff;
    margin: 0 10px 10px 10px;
    display: flex;
    justify-content: space-between;
    padding: 15px;
    .amount-price {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      .amountred {
        color: red;
        font-size: 16px;
        margin: 5px;
      }
    }
  }
}
</style>