export const testAction = (action, state, expectMutations, args, expect, done) => {
	let index = 0;
	let commit = (type, payload) => {
		let mutation = expectMutations[index]
		expect(mutation.type).to.be.equal(type)
		if (mutation.payload) {
			expect(mutation.payload).to.be.deepEqual(payload)
		} else if (payload) {
			expect(1).to.be.null;
		}
		index++
	}
	try {
		let res = action({ commit, state }, ...args)
	} catch (e) {
		console.error(e);
		expect(e).to.be.null;
		done();
	}
	
	if (typeof res === 'object' && 
			typeof res.then === 'function'
	) {
		async function generator () {
			try {
				await res;
				done()
			} catch (e) {
				console.error(e);
				expect(e).to.be.null;
				done();
			}
		}
		generator();
	} else {
		done();
	}
}