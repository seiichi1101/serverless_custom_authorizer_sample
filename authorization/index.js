// const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports.handler = (event, context, callback) => {

	var token = event.authorizationToken == 'bearer'? 'allow': 'unauthorized';

	var cert = fs.readFileSync('authorization/public.pem'); // get public key
	console.log('public.pem: ', cert);
	// jwt.verify(token, cert, { algorithms: ['RS256'] }, function (err, payload) {
	// if token alg != RS256,  err == invalid signature
	// });


	// In this example, the token is treated as the status for simplicity.
	switch (token) {
	case 'allow':
		callback(null, generatePolicy('user', 'Allow', event.methodArn));
		break;
	case 'deny':
		callback(null, generatePolicy('user', 'Deny', event.methodArn));
		break;
	case 'unauthorized':
		callback('Unauthorized');
		break;
	default:
		callback('Error');
	}
};

const generatePolicy = function(principalId, effect, resource) {
	const authResponse = {};
	authResponse.principalId = principalId;
	if (effect && resource) {
		const policyDocument = {};
		policyDocument.Version = '2012-10-17';
		policyDocument.Statement = [];
		const statementOne = {};
		statementOne.Action = 'execute-api:Invoke';
		statementOne.Effect = effect;
		statementOne.Resource = resource;
		policyDocument.Statement[0] = statementOne;
		authResponse.policyDocument = policyDocument;
	}
	return authResponse;
};
