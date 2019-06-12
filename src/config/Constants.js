export const AppUrl = 'http://localhost:4209'
export const Constants = {
	APP_NAME					: 'Rudra',
    APP_TAG	    				: 'XP',
	APP_SALT					: 'MdtKyGbnrGT3wzxgkCPRO+wwfBGrlhMwGuOHX6xyFE0=',
	
	//All API URL GOES HERE
	LOGIN_URL					: AppUrl+'/serverport/login',	
	REGISTER_URL				: AppUrl+'/serverport/register',	
	
	USER_LIST_URL				: AppUrl+'/userport/getuserlist',	
	USER_UPDATE_URL				: AppUrl+'/userport/updateuser',	

	EVENT_LIST_URL				: AppUrl+'/eventport/geteventlist',	    
	EVENT_ADD_URL				: AppUrl+'/eventport/addevent',	    
	EVENT_UPDATE_URL			: AppUrl+'/eventport/updateevent',	    
	EVENT_DETAILS_URL			: AppUrl+'/eventport/geteventdetails',	
	EVENT_SAVE_BANNER_API_POST  : AppUrl+'/eventport/eventsavebanner',    
	EVENT_SAVE_DETAILS_API_POST : AppUrl+'/eventport/saveeventdetails',    
	EVENT_GET_DETAILS_API_POST 	: AppUrl+'/eventport/geteventlocation', 

	EVENT_TIME_UPDATE_URL		: AppUrl+'/eventport/eventtimingupdate', 	
	EVENT_TIME_DELETE_URL		: AppUrl+'/eventport/eventtimingdelete', 	
	
	THEATRE_LIST_URL			: AppUrl+'/theatreport/gettheatrelist',	    
	THEATRE_ADD_URL				: AppUrl+'/theatreport/addtheatre',	    
	THEATRE_GET_URL				: AppUrl+'/theatreport/gettheatre',
	THEATRE_UPDATE_URL			: AppUrl+'/theatreport/updatetheatre',
	
	IMAGE_UPLOAD				: AppUrl+'/eventport/uploadimage',
	EVENT_BANNER_IMAGE_UPLOAD	: AppUrl+'/eventport/eventbannerupload',

	SEATING_TYPE_ADD			: AppUrl+'/general/addseating',
	SEATING_TYPE_LIST			: AppUrl+'/general/getseatinglist',
	SEATING_TYPE_GET			: AppUrl+'/general/getseattype',
	SEATING_TYPE_UPDATE			: AppUrl+'/general/updateseat',

	PAGE_LIST_URL				: AppUrl+'/general/getpagelist',	 
	PAGE_DETAIL_URL				: AppUrl+'/general/getpagedetail',	 
	PAGE_UPDATE_URL				: AppUrl+'/general/pagedetailupdate',	 


	ADD_SEAT_THEATRE			: AppUrl+'/theatreport/addseattheatre',

	VIEDO_LIST_URL				: AppUrl+'/general/getviedos',	    
	VIEDO_UPDATE_URL			: AppUrl+'/general/viedoupdate',
	VIEDO_DELETE_URL			: AppUrl+'/general/deleteviedo'	,    


    IMG							: {
    								USER_PROFILE: '../theme/dist/img/user2-160x160.jpg',	
    			  				  }
};
export default Constants
