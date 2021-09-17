require('./bootstrap');
import Vue from 'vue'
import router from './route'
import common from './common'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'view-design/dist/styles/iview.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ViewUI from 'view-design'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ViewUI)
Vue.mixin(common)

Vue.component('mainapp', require('./components/mainapp.vue').default)
let app = new Vue({
    el: '#app',
    router
})