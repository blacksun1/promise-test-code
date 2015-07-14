'use strict';

let colors = require('colors');
let Q = require('q');
let request = require('request');

const google = "http://www.google.com/";
const blacksun = "http://www.blacksun.cx/";

let requestWebsite = function(url) {
	return Q.Promise(function (resolve, reject, notify) {
		request(url, function(error, response, html) {
		    // First we'll check to make sure no errors occurred when making the request
		    console.log(colors.magenta("Completed " + url));
		    if(error) {
		    	reject(Error("An error occured: " + error));
		    	return;
		    }
		    let message = "OK";

		    if (response.statusCode !== 200) {
		    	let message = "invalid";
		    	reject(Error("An invalid status value was returned: " + response.status));
		    	return;
		    }

		    let data = {
		    	message: message,
		    	url: url,
		    	statusCode: response.statusCode,
		    	html: html,
		    };

	    	if (message === "OK") {
	    		resolve(data);
	    	} else {
	    		reject(Error(data));
	    	}
		});
	});
};

// Get google
requestWebsite(google)
	.then((value) => console.log("1st executed URL was " + value.url))

	// Get blacksun
	.then(() => requestWebsite(blacksun))
	.then((value) => console.log("2nd Executed URL was " + value.url))

	// Get ALL
	.then(() => Q.all([requestWebsite(google), requestWebsite(blacksun)]))
	.then((values) => {
		console.log("Outputing all the returned URLS from the ALL operation")
		for (let value of values) {
			console.log(value.url);
		}
	})

	// Get ANY
	.then(() => Q.any([requestWebsite(google), requestWebsite(blacksun)]))
	.then((value) => {
		console.log("Outputing all the returned URLS from the ANY operation")
		console.log(value.url);
	})

	// Handle Exceptions
	.catch((error) => console.log("Handling error: [" + error + "]"));

console.log(colors.green("Executed outside of the promise chain."));
