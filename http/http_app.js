var http, routes, server;

http = require('http');
routes = require('./routes/http_routes')();

routes.useStatic('public/views');
routes.useStatic('public/css');
routes.useStatic('public/scripts');
routes.useStatic('public/images');

server = http.createServer();

server.on('request', function(req, res){
	routes.process(req, res);
});

server.listen(4000);