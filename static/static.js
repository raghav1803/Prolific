var path = require('path');
var fs = require('fs');
var URL = require('url');

let staticFolders = [];

//*** STUDY ***
	//path.dirname() gives the directory
	//require.maim gives the main module
	//require.main.filename gives the absolute filename of the main module
//*** STUDY ***
const baseDir = path.dirname(require.main.filename);

function formatStaticFolder(baseDir, folder){
	//*** STUDY ***
		//path.normalize(folder/file) normalizes the full path, so things like ./ or ../ or even mismatched \ and /
		//are automatically normalized to proper separators, etc.
	//*** STUDY ***
	var normalizedFolder = path.normalize(folder);
	return baseDir + path.sep + normalizedFolder;
}

function getExtension(url){

	var pathname = getPathName(url);

	//*** STUDY ***
		//path.extname() gives the EXTENSION NAME
		//The extension name includes the "."
	//*** STUDY ***
	return path.extname(pathname );
}

function getPathName(url){
	//*** STUDY ***
		//URL.parse(u) parses a URL and produces various parts. pathname is one of them
		//pathname, if not in url, defaults to "/"
		//so for example, http://localhost:4000, will have pathname = "/"
	//*** STUDY ***
	var { pathname } = URL.parse(url);

	if(pathname === "/"){
		pathname = pathname + "index.html";
	}

	return pathname;
}

var static = module.exports = exports = {};

static.configureStatic = function configureStatic(folder){
	if(folder){

		let newFolder = formatStaticFolder(baseDir, folder);
		console.log(newFolder);

		//*** STUDY ***
		//fx.existsSync(path), is not deprecated, and tests whether the path is valid. WOrks for both files and directories.
		//Its async version "exists" is deprecated, however.
		//*** STUDY ***

		var exists = fs.existsSync(newFolder) ;
		console.log("exists: " + exists);

		//*** STUDY ***
				//fs.statSync(path) gives back a Stat object, which can be queried for isDirectory(), isFile(), isSocket()
				//This is a sync version. Its asyncVersion is "fs.stat(path)"
		//*** STUDY ***
		let stats = exists ? fs.statSync(newFolder): null;

		if(stats && stats.isDirectory()){

			if(!staticFolders.includes(newFolder)){
				staticFolders.push(newFolder);
				console.log("Static folder added: " + newFolder);
			}else{
				console.log("Static folder already exists: " + newFolder);
			}
		}else{
			console.log("Invalid static folder specified: " + folder);
		}
	}
};

static.folders = function * folders(){
	console.log(staticFolders.join(","));
	yield * staticFolders;
}

static.isStatic = function isStatic(req){
	if(req.method != "GET"){
		return false;
	}

	var extension = getExtension(req.url);
	console.log("is extension: " + extension);
	return extension ? true: false;
};

static.render = function serveStatic(req, res){
	for(let f of static.folders()){
		var fileName = path.normalize(f + "/" + getPathName(req.url));
		if(fs.existsSync(fileName)){
			//*** STUDY ***
				//fs.createReadStrean(path), creates a read stream
				//Stream.pipe(stream) pipes the read stream to write stream
				//it also implicitly opens it, runs it, and closes it.
			//*** STUDY ***
			fs.createReadStream(fileName, 'utf8').pipe(res);
			return;
		}
	}

	//probbaly better to call something next in the route stack?
	res.statusCode = 404;        // HTTP status 404: NotFound
	res.statusMessage = 'Not found';
	res.end();
};