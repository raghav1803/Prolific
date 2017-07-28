
var path, http, routes, server;

path = require('path');
http = require('http');


function App(){
	var server = this.server = http.createServer();
	var self = this;
	server.on('request', function(req, res){
		self.routes.process(req, res);
	});

	this.routes = require('../http/routes/http_routes')();
}

App.prototype.use = function(...args){
	this.routes.use(...args);
}

App.prototype.listen = function(port){
	this.server.listen(port);
}

var supersonic = module.exports = exports = function(){
	app = new App();
	return app;
};

supersonic.static = function(folderPath){
	return "STATIC_" + folderPath;
}