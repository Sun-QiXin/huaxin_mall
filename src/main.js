import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

//引入我们自定义的插件
import toast from "./components/common/toast";

Vue.config.productionTip = false

//自定义事件总线
Vue.prototype.$bus = new Vue()

//安装我们自定义的插件
Vue.use(toast)

//决绝移动端的300ms延迟
FastClick.attach(document.body);

//使用懒加载的插件
Vue.use(VueLazyload, {
  //设置图片未加载时的占位符
  loading: require('./assets/img/profile/15833212812605.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
