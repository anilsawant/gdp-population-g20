console.log("Hello World!!");
var fs = require("fs");
function fn(err,data) {

  if( err ) {
    return console.error("Error in Reading the file = " + err);
  }
  console.log(data.toString());
  return true;
}
var data2 = fs.readFile('input.txt', fn);


console.log("Program Ended");
