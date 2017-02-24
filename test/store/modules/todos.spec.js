import { expect } from 'chai'
import { mutations, getters, actions } from '../../../src/store/modules/todos'
import * as types from '../../../src/store/mutation-types'
import inject from 'inject-loader'
import { testAction } from '../../helpers'

describe('mutations', () => {
  it('ADD_TODOS_SUCCESS', () => {
		let mutation = mutations[types.ADD_TODOS_SUCCESS];
    const state = { todos: [] }
		const todo = { id: 1, message: 'foo', done: false }
    mutation(state, todo)
    expect(state.todos.length).to.equal(1)
		expect(state.todos[0].id).to.equal(1)
  })
	it('FILTER_TODOS', () => {
		let mutation = mutations[types.FILTER_TODOS];
    const state = { 
			todos: [
				{ id: 1, message: 'foo', done: false },
				{ id: 2, message: 'bar', done: true },
			],
			filters: [
				{
					done: false
				},
				{
					remain: false
				},
				{
					all: true
				}
			]
		}
    mutation(state, 'done')
		let o = state.filters[0]
		let k = Object.keys(o)[0]
		let v = o[k]
    expect(v).to.equal(true)
  })
})

describe('actions', () => {
	// const actionsInjector = require('inject!./actions')
	// const actions = actionsInjector({
	// 	'../../api/todos': {
	// 		async addTodos (todo) {
	// 			return;
	// 		}
	// 	}
	// })
	const { addTodos } = actions;
	async function api () {
		// noop
	}
	it('addTodos', done => {
		testAction(addTodos, { todos: [], id: 0 }, [
			{ type: types.ADD_TODOS_SUCCESS }
		], ['foo', api], expect, done)
	})
})

describe('getters', () => {

	it('filteredTodos', done => {
		const state = {
			todos: [
				{ id: 1, message: 'foo', done: false },
				{ id: 2, message: 'bar', done: true },
			],
			id: 0,
			filters: [
				{
					done: true
				},
				{
					remain: false
				},
				{
					all: false
				}]
		};
		const result = getters.filteredTodos(state)
		expect(result.length).to.be.equal(1)
		expect(result[0].id).to.be.equal(2)
		done();
	})
})