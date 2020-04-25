/*eslint no-console: 0, no-unused-vars: 0*/
"use strict";

var xsjs  = require("@sap/xsjs");
var xsenv = require("@sap/xsenv");
var port  = process.env.PORT || 3000;

var options = {
	anonymous : false, // remove to authenticate calls
	redirectUrl : "/index.xsjs"
};

// configure HANA
try {
	options = Object.assign(options, xsenv.getServices({ hana: {tag: "hana"} }));
} catch (err) {
	console.log("[XSJS HANA WARN]", err.message);
}

// configure UAA
try {
	options = Object.assign(options, xsenv.getServices({ uaa: {tag: "xsuaa"} }));
} catch (err) {
	console.log("[XSJS UAA WARN]", err.message);
}

// configure job scheduler
try {
       options = Object.assign(options, xsenv.getServices({ jobs: {tag: "jobscheduler"} }));
} catch (err) {
       console.log("[XSJS JOB WARN]", err.message);
}

// start server
xsjs(options).listen(port);

console.log("options", options);
