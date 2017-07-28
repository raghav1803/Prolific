var http, routes, server;
console.log(__dirname);
http = require('http');
routes = require('./routes/http_routes');

routes.static('public/views');
routes.static('public/css');
routes.static('public/scripts');
routes.static('public/images');

server = http.createServer();

server.on('request', function(req, res){
	routes.process(req, res);
});

server.listen(4000);