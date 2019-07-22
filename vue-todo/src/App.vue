<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput></TodoInput>
    <TodoList></TodoList>
    <TodoFooter></TodoFooter>
  </div>
  
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'

export default {
  methods: {  //
    // removeOndItem: function(todoItem, index) {
    //   localStorage.removeItem(todoItem.item);
    //   this.todoItems.splice(index, 1);
    // },
    //  toggleOneItem: function(todoItem, index){
    //     this.todoItems[index].completed = !this.todoItems[index].completed;
    //     // 데이터를 바꿨으면 지웠다 다시 set해줘야 한다.
    //     // 로컬 스토리지의 데이터를 갱신
    //     localStorage.removeItem(this.todoItems[index]);
    //     localStorage.setItem(this.todoItems[index], JSON.stringify(this.todoItems[index]));
    //   },
      // clearAllItems: function(){
      //   localStorage.clear();
      //   this.todoItems= [];
      // },
  },
  components: {
    'TodoHeader' : TodoHeader,
    'TodoInput' : TodoInput,
    'TodoList' : TodoList,
    'TodoFooter' : TodoFooter,
  }
}

</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f6;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
