import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'
// import 하는 항목이 변수면 { 변수명 }으로 적는다.

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
