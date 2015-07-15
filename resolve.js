'use strict';

let Promise = require('native-promise-only');
let assert = require('assert');
let value = 10;

// this code
// var promiseForValue = Promise.resolve(value);
// is equivalent to
var promiseForValue = new Promise(function (onFulfilled) {
  onFulfilled(value);
});

var onRejected = function(onRejected) {
	console.log('Something went wrong:', onRejected);
};

promiseForValue
.then(function(returnedValue){
	assert.equal(value, returnedValue);
	console.log('All good mate.');
})
.catch(onRejected);



