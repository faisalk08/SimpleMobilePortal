var util = require('util');

var simpleportal = require('./index');

var views = require("./views");
var services = require("./services");

simpleportal.configuration.init(function(configuration){
	console.log('Initilizing the server started...');

	simpleportal.util.callModuleFunction(simpleportal.logger, true, 'init', configuration);
	simpleportal.util.callModuleFunction(simpleportal.oauth, true, 'init', configuration);
	simpleportal.util.callModuleFunction(simpleportal.template, true, 'init', configuration);
	
	simpleportal.db.init(configuration, function(error, instance){
		if(error)
			console.log('There was some problem starting the local db, please make sure you configured things properly!!');
		else {
			console.log('Initialization of db works well now!!!');
		}
		simpleportal.util.callModuleFunction(services, true, 'init', configuration);

		simpleportal.router.register([services, views, simpleportal.oauth, simpleportal.template]);

		simpleportal.server.start(simpleportal.router, configuration);
	});
});