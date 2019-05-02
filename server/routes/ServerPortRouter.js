const express = require('express');
const ServerPortRouter = express.Router();
var md5 = require('md5');
var sha1 = require('sha1');
var stringify = require('json-stringify');
var formidable = require('formidable');
var fs = require('fs');
var appRoot = require('app-root-path');
const request = require('request-promise');
var urlConstant = require('../module/urlConstant');

var config = {
      salt_1:'pradeep3300!@#$'
};
var sess = {
  token: '',
  user: {}
}

ServerPortRouter.route('/login').post(function (req, res,next) {
    var sess = {token: '',user: {}};
    var email_address      = req.body.username;
    var password        = req.body.password;
    console.log(urlConstant.LOGIN_API_REQUEST);
    const options = {
					    method: 'POST',
					    uri: urlConstant.LOGIN_API_REQUEST,
					    body: req.body,
					    json: true
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


module.exports = ServerPortRouter;
