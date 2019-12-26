import Vue from 'vue'
import VueRouter from 'vue-router'
import app from './app.vue'
import { Header, Swipe, SwipeItem } from 'mint-ui'
import 'mint-ui/lib/style.min.css'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import router from './router.js'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.use(VueResource);

let vm = new Vue({
    el: '#app',
    render: c => c(app),
    router: router
})