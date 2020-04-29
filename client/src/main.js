// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'

import axios from 'axios'
const API_URL = "http://localhost:4000"

var customAxios = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})



Vue.config.productionTip = false
Vue.use(VueAxios, customAxios)
Vue.use(VueCookies)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  customAxios,
  http: {
    headers: {}
  },
  template: '<App/>'
})
