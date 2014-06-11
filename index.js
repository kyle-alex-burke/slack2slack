var config = require('./config');
var hapi = require('hapi');
var https = require ('https');

console.log("starting");

var server = new hapi.Server('0.0.0.0', config.port, {
	location: config.domain
});

server.route({
	path: '/',
	method: 'POST',
	handler: function(req, reply) {
		console.log("POST request received");
		//does token match either board's outgoing token
		if (req.payload.token == config.firstboard.outgoingToken || req.payload.token == config.secondboard.outgoingToken) {
			/* messages published to Slack have [USERNAME] prepended.
			we look for this signature in messages to ensure that duplicate messages 
			are not echoed back and forth repeatedly. */
			if (req.payload.text.charAt(0) != "[") {
				console.log("valid token");
				handleMessage(req.payload);
			}
		}
		else {
			console.log("invalid token");
		}
	}
});

server.route({
	path: '/',
	method: 'GET',
	handler: function(req, reply) {
		console.log("GET request received");
		reply('Are you lost?');
	}
})

function handleMessage(payload) {
	var body = JSON.stringify({
		'username': 'Humbert Botregard',
		'text': '['+payload.user_name+']'+payload.text
	});
	console.log(body);

	var options = {
		port: 443,
		method: 'POST',
		headers: {
			'Content-Length': Buffer.byteLength(body)
		}
	}

	//tailor message destination based on token in the message we received
	if (payload.token == config.firstboard.outgoingToken) {
		options.hostname = config.secondboard.host;
		options.path = '/services/hooks/incoming-webhook?token=' + config.secondboard.incomingToken;
	}
	else {			
		options.hostname = config.firstboard.host;
		options.path = '/services/hooks/incoming-webhook?token=' + config.firstboard.incomingToken;
	}

	var req = https.request(options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function(data) {
			console.log(data);
		});
	});

	req.write(body);
	req.end();	
}

server.start(function() {
	console.log("Listener started");
});