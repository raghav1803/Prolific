//*** STUDY ***
	//__dirname points to the directory currently the process is in, for this file.
//*** STUDY ***

console.log(__dirname);

//*** STUDY ***
	//process.argv is an array of all arguments
	//argv[0] is always the absolute path of node executable
	//argv[1] is always the absolute path of file
	//argv[2]-argv[n] contain the command line arguments
//*** STUDY ***
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

let argv = process.argv;
let mode = "http";

if(argv && argv[2]){
	mode = argv[2];
}
const app = "./" + mode + "/" + mode + "_app.js";
require(app);
