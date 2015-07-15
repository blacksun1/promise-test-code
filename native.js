'use strict';

let colors = require('colors');
let Promise = require('native-promise-only');
let request = require('request');

const google = "http://www.google.com/";
const blacksun = "http://www.blacksun.cx/";

let requestWebsite = function(url) {
    return new Promise(function (resolve, reject, notify) {
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
    .then(function(value) { console.log("1st executed URL was " + value.url); })

    // Get blacksun
    .then(function () { return requestWebsite(blacksun) })
    .then(function(value) { console.log("2nd Executed URL was " + value.url); })

    // // Get ALL
    .then(function () { return Promise.all([requestWebsite(google), requestWebsite(blacksun)]); })
    .then(function (values) {
        if (values === undefined) {
            throw Error("No results returned by ALL operation.")
            return
        }
        console.log("Outputing all the returned URLS from the ALL operation")
        for (let i = 0, valuesLength = values.length; i < valuesLength; i += 1) {
            let value = values[i];
            console.log("* " + value.url);
        }
    })

    // // Get ANY (native uses race)
    .then(function () { return Promise.race([requestWebsite(google), requestWebsite(blacksun)]); })
    .then(function (value) {
        console.log("Outputing all the returned URLS from the ANY operation");
        console.log("* " + value.url);
    })

    // Handle Exceptions
    .catch(function (error) { console.log("Handling error: [" + error + "]"); });

console.log(colors.green("Executed outside of the promise chain."));
