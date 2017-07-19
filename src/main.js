import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import store from './store'
import 'common/stylus/index.styl'

Vue.use(VueLazyload, {
    loading: require('common/image/default.png')    //配置懒加载默认图片
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
    router,
    store,
  render:h=>h(App)
})
