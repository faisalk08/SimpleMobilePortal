/*!
 * Simple Node Mobile Portal
 * Copyright(c) 2012 Faisal Kottarathil
 * MIT Licensed
 */

var administration = module.exports = {};

var fs = require('fs');
var util = require('simpleportal').util;
var formidable = require("formidable");
var exec = require('child_process').exec;

var logger = require('simpleportal').logger.getInstance();

console.log(module.id);
administration.id_ = module.id;

administration.service={};
administration.service['GET /'] = function(request, response, callback){
    logger.info('Simple Portal -administration', 'Installing Website..');

	fs.readFile(__dirname + '/index.html', function (err, html) {
	    if (err) {
	        throw err; 
	    }       
	    response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end(); 
	});
};

administration.service['POST /'] = function(request, response, callback){
    logger.info('Simple Portal -administration', 'Installing Website..');

	upload(request, response);
};


/*
 * Handle file upload
 */
function upload(request, response) {
     
    console.log("method upload has been called")
     
    response.writeHead(200, {"Content-Type": "text/html"})
     
    var form = formidable.IncomingForm()
     
    var fields = [],
        files = [],
        i = 0,
        url='';
         
	var result = {};
	
    form
    .on('error', function(err) {
        console.log("error handled?")
        response.end("=>Error occured. Did you try to access a post only link without post data?")
    })
    .on('field', function(field, value) {
        console.log(field, value)
        fields.push([field, value]);
        if(field =='url')
        	url = value;
    })
    .on('file', function(field, file) {
        console.log(field, file)
        files.push([field, file])
        i += 1

        fs.rename(file.path, "/tmp/" + file.name, function(err) {
            console.log("renamed")
            if(err) {
                console.log("error renaming");
            } else{
				var tmpdir = './resources/public';

            	util.checkDir(tmpdir +'/'+ url, function(){
					var cmd = 'tar -xvzf ' + "/tmp/" + file.name + ' -C ' + tmpdir +'/'+ url;

					exec(cmd, function (error, stdout, stderr) {
						result.error = error;
						result.stdout = stdout;
						result.stderr = stderr;
					});
				});
            }
        });
    })
    .on('end', function() {
        response.end("something got uploaded");
    })
     
    form.parse(request)
}