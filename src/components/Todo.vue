<template>
	<li>
		<input :checked="todo.done" type="checkbox" @change="toggleTodo(todo)">
		<span :style="{ textDecoration: todo.done ? 'line-through' : '' }">{{ todo.message }}</span>
		
	</li>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
	name: 'todo',
	props: ['todo'],	
	methods: {
		...mapActions(['toggleTodo'])
	},
	created () {
		this.$emit('xxxx', { name: '2222' })
	}
}
</script>