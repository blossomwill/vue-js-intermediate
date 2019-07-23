const addOneItem = (state, todoItem) => {
    const obj = { completed: false, item: todoItem };
    localStorage.setItem(todoItem, JSON.stringify(obj));
    state.todoItems.push(obj);
  }
const removeOndItem = (state, payload) => {
    localStorage.removeItem(payload.todoItem.item);
    state.todoItems.splice(payload.index, 1);
  }
const toggleOneItem = (state, payload) => {
    state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;
    // 데이터를 바꿨으면 지웠다 다시 set해줘야 한다.
    // 로컬 스토리지의 데이터를 갱신
    localStorage.removeItem(payload.todoItem.item);
    localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
  }
const clearAllItems = (state) =>{
    localStorage.clear();
    state.todoItems= [];
  }

  export { addOneItem, removeOndItem, toggleOneItem, clearAllItems };