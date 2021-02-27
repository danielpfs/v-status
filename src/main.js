import Vue from 'vue'
import App from './App.vue'
import Status from './index'

Vue.config.productionTip = false
Vue.use(Status)

new Vue({
  render: h => h(App),
}).$mount('#app')
