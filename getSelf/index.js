'use strict';

var commonModule = require('common');

module.exports.handler = (event, context, callback) => {

	callback(null, commonModule.cb('Go Serverless v1.0! Your function executed successfully!', ''));

	// Use this code if you don't use the http event with the LAMBDA-PROXY integration
	// callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
