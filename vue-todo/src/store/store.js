import Vue from "vue";
import Vuex from "vuex";
import * as getters from './getters'
import * as mutations from './mutations'
// Vue 플러그인 사용
// Vue를 사용하는 모든 전역에서 Vuex를 이용할 수 있게 한다
Vue.use(Vuex);
const storage = {
  fetch() {
    const arr = [];
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
          arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
          // this.todoItems.push(localStorage.key(i));
        }
      }
    }
    return arr;
  }
};
// export 하는 순간 store를 다른 파일에서 사용할 수 있다.
export const store = new Vuex.Store({
  state: {
    todoItems: storage.fetch()
  },
  getters,
  mutations,
});
