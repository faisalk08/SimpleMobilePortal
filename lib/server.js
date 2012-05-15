/*!
 * Simple Node Mobile Portal
 * Copyright(c) 2012 Faisal Kottarathil
 * MIT Licensed
 */

var http = require("http");
var url = require("url");

var util = require("./util");

var connect = require('connect');

var logger = require('./logger').getInstance();


function start(router, configuration) {
	try{
		var staticResourceDir = configuration.resources.root + 'public/';
		
		var server = require('connect').createServer(
			connect.favicon(staticResourceDir + '/favicon.ico'),
			connect.cookieParser('keyboard cat'),
			connect.session({ secret:'keyboard cat', cookie: { maxAge: 60000 }}),
			connect.static(staticResourceDir),
			logger.accessLog(),
			router.dispatch.handlers()
		);
	
		server.listen(configuration.port || 9665);
		
		logger.info('Server', 'Server started, and listeninbg on port - '+ configuration.port);
	} catch(error){
		console.log(error);
	}
}

exports.start = start;

/*
 * overriding the NODE js Response method!!!
 */
http.ServerResponse.prototype.send = function (status, headers, body) {
	if(headers && !headers['content-type']){
		headers['Content-Type'] = 'text/html; charset=UTF-8';
	}
	this.writeHead(status, headers);
	this.write(body || '');
    this.end();
};