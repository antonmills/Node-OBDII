/**
 * Express
 */
var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var http = require("http").Server(app);
var bodyparser = require("body-parser");
var ejs = require("ejs");

// init
app.set("views", appRoot + "/public/views");
app.engine("html", require("ejs").renderFile);

// allows parsing res in json
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// file access from public
app.use(express.static(appRoot + "/public"));




// exports
exports.app = app;
exports.port = port;


// boots the express server
exports.server = function(tmpPort) {
	if(tmpPort != undefined)
	{
		port = tmpPort;
	}
	http.listen(port, function()
	{
		console.log("controller_express* server(" + port + ")");
	});
};