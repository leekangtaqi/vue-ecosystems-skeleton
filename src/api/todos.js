export default {
	async addTodos (todo) {
		await new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve();
			}, 10)
		})
	}
}