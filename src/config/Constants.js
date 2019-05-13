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
	EVENT_DETAILS_URL			: AppUrl+'/eventport/geteventdetails',	    

    IMG							: {
    									USER_PROFILE: '../theme/dist/img/user2-160x160.jpg',	
    			  				}
};
export default Constants
