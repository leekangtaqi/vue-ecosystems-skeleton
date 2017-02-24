<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <ul>
      <li is="todo" v-for="todo in filteredTodos" :todo="todo"></li>
    </ul>
    <div>
      <ul class="filter">
        <li v-for="filterItem in filters" @click="filterTodos(filterOnShow(filterItem))">
          <a :style="{ color: filterItem[Object.keys(filterItem)[0]] ? '#0e4c30' : '' }">{{ filterOnShow(filterItem) }}</a>
        </li>
      </ul>
    </div>
    <div>
      <input type="text" ref="newTodoMsg">
      <input type="submit" value="submit" @click="onAddTodos">
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Todo from './Todo';

export default {
  name: 'todos',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    todo: Todo
  },
  computed: {
    ...mapState({
      todos: state => state.todos.todos,
      filters: state => state.todos.filters
    }),
    ...mapGetters(['filteredTodos']),
    title () {
      return this.filters.filter(f => {
        let k = Object.keys(f)[0];
        return f[k]
      }).map(o => Object.keys(o)[0])[0];
    },
    filterOnShow () {
      return f => {
        return Object.keys(f)[0]
      }
    }
  },
  methods: {
    ...mapActions(['addTodos', 'filterTodos']),
    onAddTodos (e) {
      let todoEl = this.$refs.newTodoMsg;
      let newTodoMsg = todoEl.value;
      if (!newTodoMsg.trim()) {
        return;
      }
      this.addTodos(newTodoMsg);
      todoEl.value = "";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

.filter li{
  display: inline-block;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
