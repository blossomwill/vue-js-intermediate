import Vue from "vue";
import Vuex from "vuex";

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
  mutations: {
      addOneItem(state, todoItem) {
        const obj = { completed: false, item: todoItem };
        localStorage.setItem(todoItem, JSON.stringify(obj));
        state.todoItems.push(obj);
      },
      removeOndItem(state, payload) {
        localStorage.removeItem(payload.todoItem.item);
        state.todoItems.splice(payload.index, 1);
      },
      toggleOneItem(state, payload){
        state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;
        // 데이터를 바꿨으면 지웠다 다시 set해줘야 한다.
        // 로컬 스토리지의 데이터를 갱신
        localStorage.removeItem(payload.todoItem.item);
        localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
      },
      clearAllItems(state){
        localStorage.clear();
        state.todoItems= [];
      },
  }
});
