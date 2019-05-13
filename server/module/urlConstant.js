var config = require('./config');
var urlConstant;
urlConstant = {
		REGISTER_API_REQUEST	    : 	config.API_HOST_URL+'/register',
        LOGIN_API_REQUEST		    : 	config.API_HOST_URL+'/login',
        
        USER_LIST_API_REQUEST	    : 	config.API_HOST_URL+'/getuserlist',
        USER_UPDATE_API_REQUEST	    : 	config.API_HOST_URL+'/updateuser',
        
        EVENT_LIST_API_REQUEST	    : 	config.API_HOST_URL+'/geteventlist',
        EVENT_ADD_API_REQUEST       : 	config.API_HOST_URL+'/addevent',
        EVENT_UPDATE_API_REQUEST    : 	config.API_HOST_URL+'/geteventlist',
        EVENT_DETAILS_API_REQUEST   : 	config.API_HOST_URL+'/geteventdetails',
}
module.exports = urlConstant;
