import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入我们自定义的插件
import toast from "./components/common/toast";

Vue.config.productionTip = false

//自定义事件总线
Vue.prototype.$bus = new Vue()

//安装我们自定义的插件
Vue.use(toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
