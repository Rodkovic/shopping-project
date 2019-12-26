import VueRouter from 'vue-router'
import home from './components/home.vue'
import member from './components/member.vue'
import shopcar from './components/shopcar.vue'
import search from './components/search.vue'


const router = new VueRouter({
    linkActiveClass: 'mui-active',
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: home },
        { path: '/member', component: member },
        { path: '/shopcar', component: shopcar },
        { path: '/search', component: search }
    ]
})

export default router;