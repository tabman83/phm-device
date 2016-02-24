if(!process.env.MQTT_CLIENT_ID) {
	console.log('Please define your MQTT_CLIENT_ID.');
	return;
}

console.log('Starting up');

var async = require('async');
var pollingInterval = 1000 * (process.env.POLLING_INTERVAL || 5); 

function initializeSensor(cb) {
	var sensorLib = null;
	var result = false;
	try {
		sensorLib = require('node-dht-sensor');
		result = sensorLib.initialize(11, process.env.SENSOR_GPIO || 4);
	} 
	catch(err) {
		console.log('You are not running on a BCM2835 hardware.');
		cb(err);
		return;
	}
	if(!result) {
		cb(new Error('Initialization failed. You probably need to run with root/Administrator privileges.'))
		return;
	}
	cb(null, sensorLib);
}

function loadProtoBuf(sensorLib, cb) {	
	var request = require('request');
	request.get('https://raw.githubusercontent.com/tabman83/phm-messages/master/sensor-message.proto', function (err, response, body) {
		if(err) {
			cb(err);
			return;
		}
		if(response.statusCode !== 200) {
			cb(new Error('Error while loading protobuf definition file (' + response.statusCode + ')'));
			return;
		}
		var ProtoBuf = require('protobufjs');
		var builder = ProtoBuf.loadProto(body);
		if(!builder) {
			cb(new Error('Error while decoding protobuf definition file'));
			return;
		}
		var SensorMessage = builder.build('SensorMessage');
		cb(null, sensorLib, SensorMessage);
	});	
}

function initializeMqtt(sensorLib, SensorMessage, cb) {
	
	var terminate = function() {
		if(handle) {
			clearTimeout(handle);
		}
		if(client) {
			client.end(true);
		}
	}	
	
	var publishSomething = function() {
		//var mean = 25;
		//var offset = Math.random() * 5 - 2.5;
		
		var readout = sensorLib.read();
		
		var payload = {
			timestamp: Date.now(),
			location: process.env.MQTT_CLIENT_ID,
			temperature: readout.temperature, //mean + offset
			humidity: readout.humidity
		};
		
		var sensorMessage = new SensorMessage(payload);
		
		var buffer = sensorMessage.toBuffer();
		
		client.publish('phm/sensors', buffer, function(err) {
			if(err) {
				terminate();
				cb(err);
				return;
			}
			//console.log('Published: ', payload);
		});
	}
	
	var mqtt    = require('mqtt');
	var mqttUrl = 'mqtt://' + (process.env.MQTT_HOST || 'localhost');
	if(process.env.MQTT_PORT) {
		mqttUrl += ':' + process.env.MQTT_PORT;
	}
	
	console.log('Connecting to ' + mqttUrl);
	
	var client  = mqtt.connect(mqttUrl, {
		clientId: process.env.MQTT_CLIENT_ID,
		username: process.env.MQTT_USERNAME,
		password: process.env.MQTT_PASSWORD
	});
	
	var handle = null;

	client.on('connect', function () {
		handle = setInterval(publishSomething, pollingInterval);
	});

	client.on('error', function (err) {
		terminate();
		cb(err);
	});
	
	process.on('SIGINT', function () {
		terminate();
		cb(null);
	});
}

async.waterfall([initializeSensor, loadProtoBuf, initializeMqtt], function(err) {
	if(err) {
		console.error(err);
	}
});
