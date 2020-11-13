import Vue from 'vue'
import VueRouter from 'vue-router'
import app from './app.vue'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import router from './router.js'
// import VueResource from 'vue-resource'
import axios from 'axios'
import VuePreview from 'vue-preview'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueRouter)
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'
// Vue.use(VueResource)
axios.defaults.baseURL = 'http://www.liulongbin.top:3005'
// Vue.http.options.root = 'http://www.liulongbin.top:3005'
// Vue.http.options.emulateJSON = true
Vue.prototype.$http = axios

Vue.use(VuePreview)

import moment from 'moment'
Vue.filter('dateformat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern);
});

let car = JSON.parse(localStorage.getItem('car') || '[]')
const store = new Vuex.Store({
    state: {
        car: car
    },
    mutations: {
        // 添加购物车数量
        addCar(state, good) {
            let flag = false;
            state.car.some(item => {
                if (item.id == good.id) {
                    item.count += good.count
                    flag = true;
                    return true;
                }
            })
            if (!flag) {
                state.car.push(good);
            }
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        //修改购物车数量
        updateCarNum(state, good) {
            state.car.some((item, i) => {
                if (item.id == good.id) {
                    state.car[i].count = good.count
                    return true;
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        //修改购物车选中状态
        updateCarCheck(state, good) {
            state.car.some((item, i) => {
                if (item.id == good.id) {
                    state.car[i].selected = good.selected
                    return true;
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        //删除购物车数量 
        deleteCar(state, id) {
            state.car.some((item, i) => {
                if (id == item.id) {
                    state.car.splice(i, 1);
                    return true
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        },
    },
    getters: {
        // 获取购物车数量
        getCarNum(state) {
            let array = state.car;
            let count = 0;
            array.forEach(item => {
                count += item.count
            });
            return count
        },
        //获取购物车所有的对象
        getCarList(state) {
            return state.car;
        },
        // 获取购物车所有商品的id
        getCarNumList(state) {
            let carNumList = [];
            state.car.forEach(item => {
                carNumList.push(item.id);
            })
            return carNumList.join(',')
        },
        //获得选中的数量及总价
        getCarAmount(state) {
            let thisCount = 0;
            let thisPrice = 0;
            state.car.forEach((item) => {
                if(item.selected){
                    thisCount += item.count
                    thisPrice += item.price * item.count
                }
            });

            return {
                count: thisCount,
                price: thisPrice
            }
        }
    }

})

let vm = new Vue({
    el: '#app',
    render: c => c(app),
    router: router,
    store
})