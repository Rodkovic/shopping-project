import VueRouter from 'vue-router'
import home from './components/home/home.vue'
import member from './components/member.vue'
import shopcar from './components/shopcar.vue'
import search from './components/search.vue'
import newlist from './components/home/newlist.vue'
import newdetail from './components/home/newdetail.vue'
import piclist from './components/home/piclist.vue'
import picinfo from './components/home/picinfo.vue'
import goodlist from './components/home/goodlist.vue'
import goodinfo from './components/home/goodinfo.vue'


const router = new VueRouter({
    linkActiveClass: 'mui-active',
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: home },
        { path: '/member', component: member },
        { path: '/shopcar', component: shopcar },
        { path: '/search', component: search },
        { path: '/home/newlist', component: newlist },
        { path: '/home/newlist/:id', component: newdetail },
        { path: '/home/piclist', component: piclist},
        { path: '/home/piclist/:id', component: picinfo},
        { path: '/home/goodlist', component: goodlist},
        { path: '/home/goodlist/:id', component: goodinfo, name: 'goodinfo'}
    ]
})

export default router;