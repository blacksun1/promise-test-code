'use strict';
var Promise = require('native-promise-only');

var myAsyncPromise = new Promise(function(onFulfilled, onRejected) {
		console.log('Executing myAsyncPromise');
		setTimeout(function() {
			onFulfilled(41);
		}, 500);
	}),
	myStaticPromise = new Promise(function(onFulfilled, onRejected) {
		console.log('Executing myStaticPromise');
		onFulfilled(100);
	}),
	myRejectedPromise = new Promise(function(onFulfilled, onRejected) {
		// setTimeout(onRejected, 1000);
		onRejected(Error('It broke'));
	}),
	onRejected = function(onRejected) {
		console.log('Something went wrong:', onRejected);
	};

// myAsyncPromise
// .then(function(fulfilledData) {
// 	console.log('myAsyncPromise fulfilled:', fulfilledData);
// })
// .then(myStaticPromise)
// .then(function(fulfilledData) {
// 	console.log('myStaticPromise fulfilled:', fulfilledData);
// })
// .catch(onRejected);


Promise
.all([
	myAsyncPromise
	.then(function(value) {
		// console.log('myAsyncPromise resolved. Value is %j', value);
		return value;
	}),

	myStaticPromise
	.then(function(value) {
		// console.log('myStaticPromise resolved. Value is %j', value);
		return value;
	}),

	// myRejectedPromise
	// .then(function(value) {
	// 	// console.log('myRejectedPromise resolved. Value is %j', value);
	// }),

	])
.then(function(value) {
	console.log('All promises fulfilled. Data is %j', value);
})
.catch(onRejected);
