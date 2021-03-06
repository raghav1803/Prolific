var supersonic = require('../supersonic/supersonic.js');

var app = supersonic();


app.use(supersonic.static('public/views'));
app.use(supersonic.static('public/css'));
app.use(supersonic.static('public/scripts'));
app.use(supersonic.static('public/images'));

//*** STUDY ***
	//1. No need to do the below. Express automatically finds the root of the app, and appends the static folders defined above.
	//2. If we are just requesting static files, we dont need to set up manual routes using get/post/put
//*** STUDY ***

//var path = require('path');
//var baseDir = path.dirname(require.main.filename);
//app.use(express.static(baseDir + path.sep + 'public' + path.sep + 'views'));
//app.use(express.static(baseDir + path.sep + 'public' + path.sep + 'css'));
//app.use(express.static(baseDir + path.sep + 'public' + path.sep + 'scripts'));
//app.use(express.static(baseDir + path.sep + 'public' + path.sep + 'images'));

//app.get('/', function (req, res) {
//	res.end();
//});

app.listen(4000);