var path = require('path');
var fs = require('fs');


//*** STUDY ***
//dirname(path) gives the base directory of a given file path
//If the file path is directory itself, it will just give the entire directory
//*** STUDY ***

function Routes(){
	this.static = require('../../static/static')();
	this.routes = new Map();
}

Routes.prototype.useStatic = function (folder){
	this.static.configureStatic(folder);
};

Routes.prototype.process = function process(req, res){
	if(this.static.isStatic(req)){
		this.static.render(req, res);
	}else{
		//route it.
		var callbacks = [];
		for(let [r,c] of this.routes){
			if(r.startsWith(req.url.pathname)){
				callbacks = c;
				break;
			}
		}
		if(callbacks.length > 0){
			callbacks.forEach(function(callback, index, array){
				callback(req, res);
			});
			return;
		}

		res.statusCode = 404;        // HTTP status 404: NotFound
		res.statusMessage = 'Not found';
		res.end();//Temp
	}
};

Routes.prototype.use = function(...args){
	let routePath = args[0];
	if(!routePath){
		routePath = "/";
	}

	if(routePath.startsWith("STATIC_")){
		this.useStatic(routePath.substring(routePath.indexOf("_") + 1));
		return;
	}

	let callbacks = [];
	if(args.length > 1){
		for(const i=1; i < args.length; i++){
			let callback = args[i];
			if(callback && typeof callback === "function"){
				callbacks.push(callback);
			}
		}
	}

	var routes = this.routes;
	var existingCallbacks = routes.get(routePath);
	if(!existingCallbacks){
		existingCallbacks = callbacks;
		routes.set(routePath, existingCallbacks);
	}else{
		existingCallbacks.concat(callbacks);
	}
}

module.exports = exports = function (){
	let routes = new Routes();

	return routes;

}

