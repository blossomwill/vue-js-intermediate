Vue 중급

* [Gihub 협업 안내책](<https://realhanbit.co.kr/books/125/pages/1129/read>)
* <https://github.com/joshua1988/vue-intermediate>

## todo App 만들기

### 1. vue CLI로 프로젝트 생성하기

* `vue --version` 3.0 이상인지 확인

```bash
vue create vue-todo
cd vue-todo
npm run serve
```



### 2. 컴포넌트 생성 및 등록하기

HelloWorld.vue 삭제하고 App.vue 내용 지운뒤에 sfc + tap으로 틀 작성

components/TodoHeader.vue 생성

컴포넌트 당 html 태그는 1개만 있어야 한다. template안에 html 태그가  병렬로 2개이상 올 수 없다.

##### 컴포넌트  import

해당 경로의 파일의 내용을 모두 가져와서 import 명에 담는다. 

```javascript
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'
```

* 컴포넌트 등록

components에 import한 컴포넌트를 등록하고 template에서 태그로 component를 사용하면 component의 내용이 태그 자리에 붙는다.

```vue
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
  components: {
    'TodoHeader' : TodoHeader,
    'TodoInput' : TodoInput,
    'TodoList' : TodoList,
    'TodoFooter' : TodoFooter,
  }
}
</script>
```



### 3. 파비콘, 아이콘, 폰트, 반응형 태그 설정하기

* 반응형 태그

구글에 'meta viewport' 검색

html의 head에 `<meta name="viewport" content="width=device-width,initial-scale=1.0">`추가하면

반응형  웹으로 데스크탑과 모바일 화면에 맞춰준다.

* 파비콘

`<https://www.favicon-generator.org/>`에서 favicon 생성. 16x16 favicon.ico부터 아래로 쭉 체크해서 생성

* 파비콘 생성 태그

```html
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
<link rel="icon" href="/favicon.ico" type="image/x-icon">
```

* 아이콘

`awesom icon` 가입, Kit's code 획득하고 html에 추가

```html
<script src="https://kit.fontawesome.com/af4b26164c.js"></script>
```

* 폰트

google font ubuntu 추가

```html
<link href="https://fonts.googleapis.com/css?family=Ubuntu&display=swap" rel="stylesheet">
```



### 4. TodoHeader 컴포넌트 구현

scoped: 컴포넌트 안에서만 유효한 style 속성이 된다.

```vue
<style scoped></style> 
```

##### Style 수정

> TodoHeader.vue

```vue
<template>
    <header>
        <h1>TODO it!</h1>
    </header>
</template>

<script>
export default {

}
</script>

<style scoped>
h1 {
    color: #2F3B52;
    font-weight: 900;   
    margin: 2.5rem 0 1.5rem;
}
</style>
```

> App.vue

```vue
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
```



### 5. TodoInput 컴포넌트의 할 일, 저장 기능 구현

##### Input, v-model

```vue
<template>
    <div>
        <input type="text" v-model="newTodoItem">
    </div>
</template>
```

`v-model`: 화면에서의 변경과 vue인스턴스안의 데이터의 변경이 동기화 된다.  2 way binding

input 태그에 입력한 text 값이 newTodoItem에 들어간다

##### v-on:click

```vue
<template>
    <div>
        <input type="text" v-model="newTodoItem">
        <button v-on:click="addTodo">add</button>
    </div>
</template>

<script>
export default {
    data (){
        return {
            newTodoItem: ''
        }
    },
    methods: {
        addTodo: function() {
            console.log(this.newTodoItem);
            // 저장하는 로직
            localStorage.setItem(this.newTodoItem, this.newTodoItem);
            this.newTodoItem = '';
        },
    }
}
```

##### Local Storage 저장

* 저장을 하고 input 박스를 비운다

`localStorage.setItem(키, 밸류)`: (키, 밸류)의 형태로 저장한다.

`확인`: 개발자도구 -> application -> Local Storage밑의 현재 실행 주소

#### this

여기서 this의 범위는 해당 this를 사용한 component로, data와 method안의 data등을 사용할 수 있다.



### 6. TodoInput 컴포넌트 코드 정리 및 UI 스타일링

클릭 시 입력창 비우는 로직을 메소드로 분리,  click대신 enter로 같은 효과주기

setItem의 key, value에 같은 객체가 들어가는걸 나중에 변경한다.

span태그를  button태그로 사용

```vue
<script>
export default {
    data (){
        return {
            newTodoItem: ''
        }
    },
    methods: {
        addTodo: function() {
            console.log(this.newTodoItem);
            // 저장하는 로직
            localStorage.setItem(this.newTodoItem, this.newTodoItem);
            this.clearInput();
        },
        clearInput: function() {
            this.newTodoItem = '';
        }
    }
}
</script>
```

inputBox 작성할 div 영역을 배경색 줘서 가득차게 보이게하고 인풋창 shadow와 함께 button의 색상 변경

* button 수정
* input 입력하다가 enter 쳤을 때 button 클릭한 것과 같은 효과 주기

```vue
<template>
    <div class="inputBox shadow">
        <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">
        <!-- <button v-on:click="addTodo">add</button> -->
        <span class="addContainer" v-on:click="addTodo">
            <i class="fas fa-plus addBtn"></i>
        </span>
    </div>
</template>
```

### 7. TodoList 컴포넌트의 할 일 목록 표시 기능 구현

localStorage의 데이터를 v-for를 이용해 li태그로 전부 출력한다

##### localStorage

##### v-for

##### list에 저장

* ul>li*3 : ul태그 밑에 li 태그 3개 생성

* localStorage 데이터 꺼내서 사용하기

* `v-bind:key='{KEY}'` : html 태그의 v디렉티브를 구분하는 key를 등록하는 것으로 vue가 태그를 제대로 구분해서 동작하도록 해준다.

### 8. TodoList 컴포넌트 UI 스타일링

##### 코드 정리 extension

* prettier-code fomatter: ctrl+shift+f

```css
<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.checkBtnCompleted {
  color: #b3adad;
}
.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}
</style>
```

### 9. TodoList 컴포넌트 할 일 삭제 기능 구현

* 삭제할 item을 구분하는 방법

`v-for="(todoItem, index) in todoItems`

v-for를 쓰면 해당 리스트에 순서를 부여하는 index를 사용할 수 있다.

```javascript
methods: {
      removeTodo: function(todoItem, index){
          localStorage.removeItem(todoItem);
          this.todoItems.splice(index, 1);
      }
  },
```

`removeItem`: localStorage에서 key를 이용해 데이터를 삭제하는 API

`splice`: 리스트에서 index부터 인자로 넘어온 개수를 지우는 javasciprt의 API.

변경해서 새로운 배열로 반환한다.

* 리스트에서 item 삭제시 storage의 데이터도 삭제하고 Vue인스턴스의 data인 todoItems에서도 지워야한다.



### 10. TodoList 컴포넌트의 할 일 완료 기능 구현(Hard)

* TodoInput에서 key, value 구분

  * ```javascript
    let obj = {completed: false, item: this.newTodoItem};
    ```

  * (Text가 체크여부 진위값, Text)

  * `JSON.stringfy(obj)`: obj객체를 string으로 변환해서 로컬스토리지에 저장

  * ```javascript
    localStorage.setItem(this.newTodoItem, JSON.stringify(obj));
    this.clearInput();
    ```

  * 코드 작성전 object형태가 아닌 newTodoItem clear 한다

* 로컬스토리지에 object로 저장

  * > TodoLIst.vue

  * ```
     created: function() {
        if (localStorage.length > 0) {
          for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
                this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));          
              // this.todoItems.push(localStorage.key(i));
            }
            // console.log(localStorage.key(i));
          }
        }
      }
    ```

  * 

* v-bind로 vue데이터의 boolean조건에 따라 css 적용 분기

  * TodoList.vue

  * ```vue
    <li v-for="(todoItem, index) in todoItems" v-bind:key="todoItem.item" class="shadow">
              <i class="checkBtn fas fa-check" v-bind:class="{checkBtnCompleted: todoItem.completed}" 
                v-on:click="toggleComplete(todoItem, index)"></i>
              <span v-bind:class="{textCompleted: todoItem.completed}">{{ todoItem.item }}</span>
              <span class="removeBtn" v-on:click="removeTodo(todoItem, index)">
                  <i class="fas fa-trash-alt"></i>
              </span>
            </li>
    ```

  * ```
    methods: {
          removeTodo: function(todoItem, index){
              localStorage.removeItem(todoItem);
              this.todoItems.splice(index, 1);
          },
          toggleComplete: function(todoItem, index){
            todoItem.completed = !todoItem.completed
            // 데이터를 바꿨으면 지웠다 다시 set해줘야 한다.
            // 로컬 스토리지의 데이터를 갱신
            localStorage.removeItem(todoItem.item);
            localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
          }
      },
    ```



### 11. [리팩토링] 할 일 목록 표시 기능

app.vue에서 로직을 처리하고 다른 component하위로 두고 데이터를  props로 보내는 구조로 설계 

* todolist.vue의 created와 data를 app.vue로 이동
* totoItems의 creaeted시 초기화를 App.vue에서하고 TodoList에는 props를 정의하여 

<TodoList v-bind:propsdata ="todoItems"></TodoList> 사용해서 TodoList에 propsdata에 Vue의 todoItems데이터를 넘긴다.

* TodoList에서는 propsdata를 사용한다

> App.vue

```vue
<TodoList v-bind:propsdata="todoItems"></TodoList>
```

> App.vue

```vue
<script>
export default {
  data() {
    return {
      todoItems: []
    }
  },
  created: function() {
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
            this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));          
          // this.todoItems.push(localStorage.key(i));
        }
        // console.log(localStorage.key(i));
      }
    }
  },
}
</script>
```

> TodoList.vue

```
<li v-for="(todoItem, index) in propsdata" v-bind:key="todoItem.item" class="shadow">
```

> TodoList.vue

```vue
<script>
export default {
  props: [
    'propsdata'
  ],
  }
  </script>
```

### 12. [리팩토링] 할 일 추가기능

TodoInput.vue의 아이템 추가메소드의 핵심기능인, 로컬저장소에 아이템저장과 todoItem에 오브젝트 추가를 App.vue의 메소드로 정의한다.  메소드의 이름은 addOneItem이고 하위의 TodoInput으로부터 emit event를 받고 인자로 todoItem을 넘겨받는다. 

> TodoInput.vue

```
methods: {
addTodo: function() {
if (this.newTodoItem !== "") {
this.$emit('addTodoItem', this.newTodoItem);
this.clearInput();
} else {
this.showModal = !this.showModal;
}
}
}

```

> App.vue

```javascript
<TodoInput v-on:addTodoItem='addOneItem'></TodoInput>

methods: {
    addOneItem: function(todoItem) {
      let obj = { completed: false, item: todoItem };
      localStorage.setItem(todoItem, JSON.stringify(obj));
      this.todoItems.push(obj);
    }
  },
```



### 13. [리팩토링] 할일 삭제 기능

 TodoList의 글을 삭제하는 로직은 propsdata로 하는것도 이상하고 상위의 로직을 수행하는 App에서 처리해야한다. TodoList에서는 emit을 사용해 App에 삭제할 object와 index를 넘긴다. 

App.vue는 TodoList component에서 이벤트와 함께 데이터를 받는다. 넘어온 데이터는 object로 

{ *completed*: *false*, *item*: todoItem } 이렇게 담겨있다. 삭제는 object의 key로 해야하는데 다행히 todoItem의 key와 todoItem.item은 내용이 동일해서 삭제가 된다.

> TodoList.vue

```
 removeTodo: function(todoItem, index){
          this.$emit('removeItem', todoItem, index);
          //console.log(todoItem);
      },
```

> App.vue

```vue
<TodoList 
    v-bind:propsdata="todoItems" 
    v-on:removeItem="removeOndItem"></TodoList>

removeOndItem: function(todoItem, index) {
      localStorage.removeItem(todoItem.item);
      this.todoItems.splice(index, 1);
    },
```

### 14. [리팩토링] 할 일 완료기능

TodoList에서 toggleComplete를 수행하면 emit을 App.vue에 보내고 App.vue가 이벤트를 받아서 toggleOneItem을 실행해서 todoItem을 바꾼다. 

여기서 todoItem = !todoItem; 대신

this.todoItems[index].completed = !this.todoItems[index].completed; 사용하는데

컴포넌트간의 경계를 명확히 하기 위해서 쓴다고 한다

근데  이건 왜 넘어온 그대로 쓸까??

```
localStorage.removeItem(todoItem.item);
localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
```

이렇게 쓰면 안되나?

```vue
this.todoItems[index].completed = !this.todoItems[index].completed;
        // 데이터를 바꿨으면 지웠다 다시 set해줘야 한다.
        // 로컬 스토리지의 데이터를 갱신
localStorage.removeItem(this.todoItems[index]);
localStorage.setItem(this.todoItems[index], JSON.stringify(this.todoItems[index]));
```

### 15. [리팩토링] 할일 삭제 기능

TodoFooter의 삭제메소드는 emit을 발생시키고 App에서는 

로컬저장소비우기 LocalStorage.clear(), 화면에 나타나는 item 제거 this.todoItems=[]를 한다.

### 16. 리팩토링이 완료된 애플리케이션 정리

컴포넌트들이 같은 데이터를 조작하기 때문에  상위 컴포넌트인 App 하나에 몰아서 로직을 처리하고 나머지는 나타내는 컴포넌트 역할과 컨테이너 컴포넌트인 app에 보내고 받는 전체구조를 형성하였다. 

### 17. 모달 컴포넌트 등록

> Modal.vue

```vue
<template>
    <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>
          
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
    name: 'Modal',
}
</script>
```

##### slot

* 특정 컴포넌트의 일부UI를 재정의할 수 있는 기능.

### 18. 트랜지션 소개 및 구현

트랜지션 클래스와 트랜지션 리스트 문서를 본다

* <transition-group *name*="list" *tag*="ul">

name은 css와 연관된 속성이고 tag는 말그대로 tag를 의미한다.

```css
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
```

* 트랜지션 설명

트랜지션의 동작은 1초가 걸린다. 리스트의 생성은 opacity 투명도 0에서부터 1로 진해지고 Y축으로 30px움직여서 본래위치에 도달한다. ()



## Vuex - 상태 관리 라이브러리

#### 개요

* 복잡한 애플리케이션의 컴포넌트들을 효율적으로 관리하는 Vuex 라이브러리(상태관리 방법)소개

* Vuex 라이브러리의 등장 배경인  Flux 패턴 소개

  * MVC 패턴에서 Flux 패턴으로 넘어간다

* Vuex 라이브러리의 주요 속성인 state, getters, mutations, actions 학습

  * state: data, getters: computed, mutations: method, actions: 비동기 method

* Vuex를 더 쉽게 코딩할 수 있는 방법인 Helper 기능 소개

* Vuex로 프로젝트를 구조화하는 방법과 모듈 구조화 방법 소개

### Flux란?

* MVC패턴의 복잡한 데이터 흐름 문제를 해결하는 개발 패턴 - Unidirectional data flow **단방향통신**
* Action -> Dispatcher -> Model -> View

1. action : 화면에서 발생하는 이벤트 또는 사용자 입력
2. dispatcher : 데이터를 변경하는 방법, 메서드
3. model : 화면에 표시할 데이터
4. view : 사용자에게 비춰지는 화면

### Vuex로 해결할 수 있는 문제

1. MVC 패턴에서 발생하는 구조적 오류
2. 컴포넌트간 데이터 전달 명시
3. 여러 개의 컴포넌트에서 같은 데이터를 업데이트 할 때 동기화 문제

### Vues 컨셉

* State: 컴포넌트 간에 공유하는 데이터 data()
* View: 데이터를 표시하는 화면 `template`
* Action: 사용자의 입력에 따라 데이터를 변경하는 `methods`

템플릿(화면에서) 버튼을 클릭해서 method(action)가 발생하면 data(state)가 변경된다.

Actions는 API를 호출 하는 비동기 로직에 사용되고, state를 변경하려면 actions가 mutations을 호출해서 state를 변경시킨다



### Vuex 설치 및 등록

* `npm install vuex --save`
* src 밑 store폴더 생성, store.js 생성

> store.js

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

// Vue 플러그인 사용
// Vue를 사용하는 모든 전역에서 Vuex를 이용할 수 있게 한다
Vue.use(Vuex);

// export 하는 순간 store를 다른 파일에서 사용할 수 있다.
export const store = new Vuex.Store({

}
```

> main.js

```javascript
import Vue from 'vue'
import App from './App.vue'
import { store } from './store'
// import 하는 항목이 변수면 { 변수명 }으로 적는다.

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

```

### state와 getters 소개

* state: 여러컴포넌트에 공유되는 데이터 `data`
* getters: 연산된 state값을 접근하는 속성 `computed`
* mutations: state값을 변경하는 이벤트 로직. 메서드 `methods`
* actions: 비동기 처리 로직을 선언하는 메서드 `async methods`

#### State html에서 사용

```javascript
state: {
    message: 'Hellow vue'
}
```

```html
{{ this.$store.state.message }}
```

#### getters

state값을 접근하는 속성이자 computed()처럼 미리 연산된 값을 접근하는 속성

```javascript
state: {
    num: 10
},
getters: {
    getNumber(state){
        return state.num;
    }
}
```

```html
{{ this.$store.getters.getNumber }}
```

#### state vue 활용

>  store.js

```javascript
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
  }
});
```

> TodoList.vue

```vue
<li v-for="(todoItem, index) in this.$store.state.todoItems" v-bind:key="todoItem.item" class="shadow">
          <i class="checkBtn fas fa-check" v-bind:class="{checkBtnCompleted: todoItem.completed}" 
            v-on:click="toggleComplete(todoItem, index)"></i>
```



### mutations와 commit()형식 소개

* state의 값을 변경할 수 있는 유일한 방법이자 메서드
* 뮤테이션은 `commit()`으로 조작시킨다
* commit의 첫번째 인자는 mutation의 이름

```javascript
state: {num: 10},
mutations: {
    printNumbers(state) {
        return state.num
    },
    sumNumber(state, anotherNum) {
        return state.num + anotherNum;
    }
}
//vue
this.$store.commit('printNumber');
this.$store.commit('sumNumbers', 20);
```

#### mutations의 commit()형식

* 호출만 아니라 인자를 전달할 수 있음
* state를 변경하기 위해 mutations를 동작시킬 때 인자(payload)를 전달할 수 있음
* `store.js의 state접근을 위해서는 넘어오는 state인자로 접근한다`

```javascript
state: {num: 10},
mutations: {
    modifyState(state, payload) {
    console.log(payload.str)
        return state.num
    }
}
//vue
this.$store.commit('modifyState', {
    str: 'passed from payload',
    num: 20
});
```

### mutations 사용

mutations로 state의 값을 변경하기 위한 데이터를 넘겨주는 곳에 commit()을 호출한다.

#### 왜 commit으로 mutations을 접근해야 하는가?

##### 사용하지 않으면

* 여러 개의 컴포넌트에서 state를 직접 변경하는 경우 어느 컴포넌트에서 해당 state를 변경했는지 추적하기 어렵다. 
* 특정 시점에 어떤 컴포넌트가 state를 접근하여 변경한건지 확인하기 어렵다

##### 사용하면

* mutations를 사용해야 뷰가 제대로 반응한다. (코어 팀이 설계한대로)
* 개발자 도구로 mutations, state를 확인할 수 있다.
* 따라서, 뷰의 반응성을 거스르지 않게 명시적으로 상태 변화를 수행. 
* **반응성, 디버깅, 테스팅 혜택**



### actions란?

* 비동기 처리 로직을 선언하는 메서드, 비동기 로직을 담당하는 mutations
* 데이터 요청, Promise, ES async와 같은 비동기 처리는 모두 actions에 선언
* `dispatch('actions이름')`로 호출한다

> actions의 흐름. 비동기 로직은 아닌 코드

```javascript
state: {
    num: 10
},
mutations: {
    doubleNumber(state) {
        state.num*2;
    }
},
actions: {
    delayDoubleNumber(context){
        context.commit('doubleNumber');
    }
}

// vue
this.$store.dispatch('delayDoubleNumber');
```



> actions 비동기 코드 예제2

```javascript
// store.js
mutations: {
    setData(state, fetchedData) {
        state.product = fetchedData;
    }
},
actions: {
    fetchProductData(context) {
  		return axios.get('https://domain.com/products/1')
  		.then(reponse => context.commit('setData', response));
    }
}

// App.vue
methods: {
    getProduct() {
        this.$store.dispatch('fetchProductData')
    }
}
```

#### 왜 비동기 처리 로직은 actions에 선언해야 할까?

* 언제 어느 컴포넌트에서 해당 state를 호출하고, 변경했는지 확인하기가 어려움

> 결론: state 값의 변화를 추적하기 어렵기 때문에 mutations속성에는 동기 처리 로직만 넣어야 한다.
>
> 비동기처리 로직과 동기 처리 로직 모두 mutations을 호출하는 구조로 만들어서 state의 변화가 동기적으로 발생하도록 한다.



## 헬퍼 함수 및 ES6 Spread 연산자 소개

Helper : Store에 있는 아래 4가지 속성들을 간편하게 코딩하는 방법

* state -> mapState
* getters => mapGetters

### 헬퍼의 사용법

* 헬퍼를 사용하고자 하는 vue파일에서 아래와 같이 해당 헬퍼를 로딩

```javascript
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    computed() { ...mapState(['num']), ...mapGetters(['countedNum'])},
    methods: { ...mapMutations(['clickBtn']), ...mapActions(['asyncClickBtn'])}
}

```

...은 ES6의 Object Spread Operator

### Spread 연산자

?

