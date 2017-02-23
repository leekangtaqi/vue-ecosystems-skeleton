<div>

	<div v-on:click="msg += 'xxxxxx'">
		<div>
			<div>{{ msg }}</div>
		</div>
	</div>
	
</div>

<script>	

	export default {
		name: 'other-component',
		data () {
			return {
				msg: 'testing !',
				msg1: 'crashed !',
				dynamicId: true
			}
		},
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