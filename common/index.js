module.exports.cb = (msg, event) => {
	return {
		statusCode: 200,
		body: JSON.stringify({
			message: msg,
			input: event,
		}),
	};
};
