// requires
var net = require("net");
var client = new net.Socket();
var utf8 = require("utf8");
var Q = require("q");

// mode parsers
var mode01 = require(appRoot + "/mode/mode1parse");


exports.clientConnect = function()
{
	var deferred = Q.defer;

	// initial connection
	client.connect(config['tcp-port'], config['tcp-ip'], function()
	{
		console.log("Connecting");
	});
}


// initial connection
//client.connect(config['tcp-port'], config['tcp-ip'], function()
//{
//	console.log("Connecting");
//});
//
//// on connect, issue ATZ init
//client.on("connect", function(data)
//{
//	console.log("Connected, handshake in progress");
//	client.write("ATZ" + '\r');
//});
//
//// communication parsing
//client.on("data", function(buffer)
//{
//	var str = buffer.toString('utf8'); // note: has to be utf8, this took me forever to find out.
//	if(str.indexOf('>') > -1)
//	{
//		// test engine coolant temperature
//		client.write("0105" + '\r');
//	} else
//	{
//		var newdata = clean(str);
//		console.log(newdata.res + " temperature: " + parse(newdata.res) + " degrees");
//	}
//});
//
//// closing connection
//client.on("close", function()
//{
//	console.log("Connection closed");
//});



// takes the response, splitting the request, garbage and response
// out as a data object
clean = function(data)
{
	matches = data.match(/(.*)[\r\n]+(.*)/i);

	if (!matches)
	{
		console.log("FOOBAR");
		return;
	} else
	{
		data =
		{
			req: matches[1],
			res: matches[2]
		};

		return data;
	}
};


// parse is two step:
// 1. get the first two characters of the cleaned string, this identifies the mode
// 2. send the remaining 4 characters to be parsed, this include the next two characters (the pid), and the last two, the value
parse = function(d)
{
	var mode = String(d).split(' ')[0];
	var pid = String(d).split(' ')[1];
	var data = String(d).split(' ');

	// get mode
	switch(mode)
	{
		case "41":
			return [mode01[pid].desc, mode01[pid].parse(data.slice(2))];
			break;
	}
};


// for testing calculations only
//var tmp = parse("41 04 4D"); // load
//console.log(tmp[0]);
//console.log(tmp[1]);
//
//var tmp = parse("41 05 48"); // temp
//console.log(tmp[0]);
//console.log(tmp[1]);
//
//var tmp = parse("41 00 9E 3E B8 11"); // check if pids 1-20 are available
//console.log(tmp[0]);
//
//var tmp = parse("41 20 80 00 00 00"); // check if pids 21-40 are available
//console.log(tmp[0]);