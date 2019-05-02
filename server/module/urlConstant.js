var config = require('./config');
var urlConstant;
urlConstant = {
		REGISTER_API_REQUEST	: 	config.API_HOST_URL+'/register',
        LOGIN_API_REQUEST		: 	config.API_HOST_URL+'/login',
}
module.exports = urlConstant;
