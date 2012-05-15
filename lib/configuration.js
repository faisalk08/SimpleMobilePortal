/*!
 * Simple Node Mobile Portal
 * Copyright(c) 2012 Faisal Kottarathil
 * MIT Licensed
 */

var configuration = module.exports = {};

var util = require('./util');

var values = {};
var configuration_file = 'configuration.json';

configuration.init = function(callback){
	util.readFile(configuration_file, function(err, configuration){
		if(err){
			throw Error('Configuration file not found!!');
		}else{
			values = JSON.parse(configuration);
			callback(values);
		}
	});
}