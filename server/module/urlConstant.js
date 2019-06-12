var config = require('./config');
var urlConstant;
urlConstant = {
		REGISTER_API_REQUEST	        : 	config.API_HOST_URL+'/register',
        LOGIN_API_REQUEST		        : 	config.API_HOST_URL+'/login',
        
        USER_LIST_API_REQUEST	        : 	config.API_HOST_URL+'/getuserlist',
        USER_UPDATE_API_REQUEST	        : 	config.API_HOST_URL+'/updateuser',
        
        EVENT_LIST_API_REQUEST	        : 	config.API_HOST_URL+'/geteventlist',
        EVENT_ADD_API_REQUEST           : 	config.API_HOST_URL+'/addevent',
        EVENT_UDPATE_API_POST           : 	config.API_HOST_URL+'/updateevent',

        EVENT_UPDATE_API_REQUEST        : 	config.API_HOST_URL+'/geteventlist',
        EVENT_DETAILS_API_REQUEST       : 	config.API_HOST_URL+'/geteventdetails',
        EVENT_BANNER_API_REQUEST        : 	config.API_HOST_URL+'/eventbanner',
        EVENT_BANNER_API_POST           : 	config.API_HOST_URL+'/saveeventbanner',
        EVENT_SAVE_DETAILS_API_POST     : 	config.API_HOST_URL+'/saveeventdetails',
        EVENT_GET_DETAILS_API_POST      : 	config.API_HOST_URL+'/geteventlocation',
        EVENT_TIMING_UPDATE_API_POST    : 	config.API_HOST_URL+'/updateeventtiming',
        EVENT_TIMING_DELETE_API_POST    :   config.API_HOST_URL+'/deleteeventtiming',
        EVENT_IMAGE_UPLOAD_API_POST     :   config.API_HOST_URL+'/imageupload',
        EVENT_BANNER_UPLOAD_API_POST    :   config.API_HOST_URL+'/eventbannerupload',

        THEATRE_GET_LIST                :   config.API_HOST_URL+'/gettheatrelist',
        THEATRE_ADD_POST                :   config.API_HOST_URL+'/addtheatre',
        THEATRE_GET_POST                :   config.API_HOST_URL+'/gettheatre',
        THEATRE_UPDATE_POST             :   config.API_HOST_URL+'/updatetheatre',
        THEATRE_UPDATE_SEAT             :   config.API_HOST_URL+'/updatetheatreseat',

        ADD_SEAT_API                    :   config.API_HOST_URL+'/addseat',
        GET_SEAT_API                    :   config.API_HOST_URL+'/getseattinglist',
        UPDATE_SEAT_API                 :   config.API_HOST_URL+'/updateseat',

        GET_PAGE_LIST_API               :   config.API_HOST_URL+'/getpagelist',
        GET_PAGE_DETAIL_API             :   config.API_HOST_URL+'/getpagedetails',
        UPDATE_PAGE_DETAIL_API          :   config.API_HOST_URL+'/pagedetailupdate',

        UPDATE_VIEDO_API                :   config.API_HOST_URL+'/updateviedos',
        GET_VIEDO_API                   :   config.API_HOST_URL+'/getviedos',
        DELETE_VIEDO_API                :   config.API_HOST_URL+'/deleteviedos',
}
module.exports = urlConstant;
