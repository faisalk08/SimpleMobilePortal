var exampleService = module.exports = {};

exampleService.service={};

exampleService.service.hello = function(request, response, callback) {
	console.log("Service 'hello' is called.");
	var message = 'Hello World!!';
	callback(null, {message:message});
}