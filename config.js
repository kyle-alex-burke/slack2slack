module.exports = {
	domain: 'yourshinyapp.herokuapp.com',
	port: Number(process.env.PORT || 5000),
	firstboard: {
		host: 'first.slack.com',
		incomingToken: '',
		outgoingToken: ''
	},
	secondboard: {
		host: 'second.slack.com',
		incomingToken: '',
		outgoingToken: ''
	}
}