import * as types from '../mutation-types';
import todosApi from '../../api/todos';

export const state = {
	todos: [],
	id: 0,
	filters: [
		{
			done: false
		},
		{
			remain: false
		},
		{
			all: true
		}]
};

export const actions = {
	async addTodos ({ commit, state }, message, api) {
		!api && (api = todosApi.addTodos)
		let res = null;
		let savedTodos  = [...state.todos]
		let todo = { id: state.id++, message, done: false }
		try {
			await api(todo);
		} catch(e) {
			commit(types.ADD_TODOS_FAILED, savedTodos);
		}
		commit(types.ADD_TODOS_SUCCESS, todo);
	},
	toggleTodo ({ commit }, todo) {
		commit(types.TOGGLE_TODO, todo)
	},
	filterTodos ({ commit }, filterItem) {
		commit(types.FILTER_TODOS, filterItem)
	}
};

export const getters = {
	filteredTodos: (state) => {
		let filtered = state.filters.filter(f => {
			let k = Object.keys(f)[0]
			return f[k]
		})[0];
		return state.todos.filter(t => {
			let k = Object.keys(filtered)[0]
			if ((k === 'done') && t.done) {
				return t;
			} else if (k === 'remain' && !t.done) {
				return t;
			}
			else if (k === 'all') {
				return t;
			}
		})
	}
};

export const mutations = {
	[types.ADD_TODOS_SUCCESS] (state, todo) {
		state.todos.push(todo);
	},
	[types.ADD_TODOS_FAILED] (state, todos) {
		state.todos = todos;
	},
	[types.TOGGLE_TODO] (state, todo) {
		let todoInStore = state.todos.filter(t => t.id === todo.id)[0];
		todoInStore.done = !todoInStore.done;
	},
	[types.FILTER_TODOS] (state, todo) {
		state.filters.forEach(f => {
			let key = Object.keys(f)[0];
			if (todo === Object.keys(f)[0]) {
				f[key] = true;
			} else {
				f[key] = false;
			}
		})
	}
};

export default {
	state,
	actions,
	getters,
	mutations
}