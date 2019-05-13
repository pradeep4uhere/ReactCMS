const express = require('express');
const EventPortRouter = express.Router();
var md5 = require('md5');
var sha1 = require('sha1');
var stringify = require('json-stringify');
var formidable = require('formidable');
var fs = require('fs');
var appRoot = require('app-root-path');
const request = require('request-promise');
var urlConstant = require('../module/urlConstant');
const LIST_API_REQUEST 		= urlConstant.EVENT_LIST_API_REQUEST;
const UPDATE_API_REQUEST    = urlConstant.EVENT_UPDATE_API_REQUEST;
const ADD_API_REQUEST       = urlConstant.EVENT_ADD_API_REQUEST;
const DETAILS_API_REQUEST   = urlConstant.EVENT_DETAILS_API_REQUEST;
/**************EVENT List API Start Here**********************************/
EventPortRouter.route('/geteventlist').post(function (req, res,next) {
    var token        	= req.body.token;
    var urlParams       = req.body.urlParams;
    var postData ={
        token	    : token,
        urlParams   : urlParams
    }
    //console.log(postData);
    //console.log('-----------------------'+urlParams+'------------------------------');
    if(postData.urlParams!=''){
        if(postData.urlParams!=null){
            LIST_API_REQUEST = urlParams;
        }
    }
    const options = {
        method: 'POST',
        uri: LIST_API_REQUEST,
        body: postData,
        json: true,
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    }
    
    console.log(postData);
    request(options)
	    .then(function (response) {
	        console.log(response)
	        res.end(JSON.stringify(response));
	    })
	    .catch(function (err) {
	        console.log(err)
	})
});




/**************ADD NEW EVENT API Start Here**********************************/
EventPortRouter.route('/addevent').post(function (req, res,next) {
    var token        	= req.body.token;
    var title        	= req.body.event.title;
    var description     = req.body.event.description;
    var durration       = req.body.event.durration;
    var status          = req.body.event.status;
    var postData ={
        title       : title,
        description : description,
        durration   : durration,
        status      : status,
        token	    : token,
    }
   
    console.log(postData);
    const options = {
        method: 'POST',
        uri: ADD_API_REQUEST,
        body: postData,
        json: true,
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    }
    request(options)
	    .then(function (response) {
	        console.log(response)
	        res.end(JSON.stringify(response));
	    })
	    .catch(function (err) {
	        console.log(err)
	})
});


/**************EVENT API Ends Here************************************************/


/**************GET EVENT DETAILS API Start Here**********************************/
EventPortRouter.route('/geteventdetails').post(function (req, res,next) {
    var token        	= req.body.token;
    var event_id       = req.body.event_id;
    var postData ={
        token	    : token,
        id          : event_id
    }
    const options = {
            method: 'POST',
            uri: DETAILS_API_REQUEST,
            body: postData,
            json: true,
            headers: {
                'Authorization': 'Bearer ' + token,
            },
    }
    console.log('========================================================');
    console.log('======================Post Data=========================');
    console.log(options);
    console.log('========================================================');
    
    request(options)
	    .then(function (response) {
            console.log('========================================================');
            console.log('===================Response Data========================');
            console.log(response)
            console.log('========================================================');
	        res.end(JSON.stringify(response));
	    })
	    .catch(function (err) {
	        console.log(err)
	})
});



module.exports = EventPortRouter;
