<template>

	<div v-on:click="msg += 'xxxxxx'">
		<input type="text" v-focus>
		<div>
			<div>{{ msg }}</div>
		</div>
	</div>
	<!--<other-component></other-component>-->
</template>

<script>
	import OtherComponent from './OtherComponent';

	export default {
		name: 'test',
		data () {
			return {
				msg: 'testing !',
				msg1: 'crashed !',
				dynamicId: true
			}
		},
		components: [OtherComponent],
		created: function() {
			this.msg = '2222';
			this.msg1 = 'fffff'
		},
		watch: {
			msg: function(val) {
				console.warn('watched' + val);
			}
		},
		methods: {
			xxx: function(e) {
				alert(this.msg)
			}
		}
	}
</script>

<style>

</style>