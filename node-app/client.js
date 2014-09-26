// global config variables
var path = require("path");
global.appRoot = path.resolve(__dirname);
global.config = require("./config.json");


// create the app controllers
var controller_express = require(appRoot + "/controllers/controller_express.js");
var controller_tcpclient = require(appRoot + "/controllers/controller_tcpclient.js");


// routes
controller_express.app.get("/", function(request, response)
{
	response.render("index.html");
});





////
//controller_express.app.get("/api/getPostsByTag/:id", APIGetPostsByTag);
//function APIGetPostsByTag(request, response)
//{
//	// collects params
//	var limit = request.query.limit > 0 ? request.query.limit : 30;
//	var skip = request.query.skip > 0 ? request.query.skip : 0;
//	var tag = request.params.id;
//
//	var results = controller_mongo.getEntriesByTag(tag, campaignID, limit, skip)
//		.then(function(data)
//		{
//			response.json(data);
//		}, function(err)
//		{
//			console.error("oh shiz");
//			response.json(500, "oh shiznet");
//		});
//
//}







// init - create server on 8080
controller_express.server(8080);
//controller_tcpclient.client.connect()