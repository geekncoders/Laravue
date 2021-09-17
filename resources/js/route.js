import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import firstPage from './components/firstPage'
import secondPage from './components/secondPage'
import hooks from './components/hooks'
import method from './components/methods'
import homePage from './components/homePage'
import tags from './components/tags'

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/tags',
        component: tags
    },
    {
        path: '/first-page',
        component: firstPage
    },
    {
        path: '/second-page',
        component: secondPage
    },
    {
        path: '/hooks',
        component: hooks
    },
    {
        path: '/method',
        component: method
    },
]

export default new VueRouter({
    mode: 'history',
    routes
})