var path = require('path');
var fs = require('fs');
var static = require('../../static/static');

//*** STUDY ***
//dirname(path) gives the base directory of a given file path
//If the file path is directory itself, it will just give the entire directory
//*** STUDY ***

var routes = module.exports = exports = {};

routes.static = function (folder){
	static.configureStatic(folder);
};

routes.process = function process(req, res){
	if(static.isStatic(req)){
		static.render(req, res);
	}else{
		res.statusCode = 404;        // HTTP status 404: NotFound
		res.statusMessage = 'Not found';
		res.end();//Temp
	}
};