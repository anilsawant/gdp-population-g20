var globalData = [];



var control = document.getElementById('datafile');
control.addEventListener("change", function(e) {
  var   files = control.files,
        len = files.length;

    for (var i=0; i < len; i++) {
        console.log("Filename: " + files[i].name);
        console.log("Type: " + files[i].type);
        console.log("Size: " + files[i].size + " bytes");
    }
}, false);


var target = document.getElementById("your-files");

target.addEventListener("dragover", function(event) {
    event.preventDefault();
}, false);

target.addEventListener("drop", function(event) {

    // cancel default actions
    event.preventDefault();
    var files = event.dataTransfer.files,
        len = files.length;

    for (var i=0; i < len; i++) {
        console.log("Filename: " + files[i].name + ", Size: " + files[i].size + " bytes");
        this.innerHTML = "       " + files[i].name;
    }

    var reader = new FileReader();
    reader.readAsText(files[0]);
    reader.onload = function(event) {
      var contents = event.target.result;
      var newLineCharacter = "\n";
      if( contents.indexOf("\r\n") != -1 )
        newLineCharacter = "\r\n";
      var delim = ",";
      var isDataQuoted = false;
      if( contents.indexOf("\"") != -1 )
        isDataQuoted = true;

      // function call to create the JSON String representation of the data
      // createJSONString( contents, newLineCharacter, delim, isDataQuoted );  // accepts the raw content,new-line character, delimiter, and whether data is by default surrounded by quotes("")
      globalData = JSON.parse(contents);
      if( confirm("Would you like to see the JSON Object in the console?") ) {
        console.log(globalData);
        console.log("Total objs in the array = " + globalData.length);
      }

    };// End onload

    reader.onerror = function(event) {
        console.error("File could not be read! Code " + event.target.error.code);
    };

}, false);

function createJSONString( content, newLineCharacter, delim, quoted) {
  var lines = content.split( newLineCharacter );
  var noOfLines = lines.length;
  var data = [];
  for( var i = 0; i < noOfLines; i++ ) {
    var line = lines[i];
    if( line != null && line != '' && line.length != 0 ) {
      var tokens = line.split( delim );
      data.push( tokens ); // pushes a line of tokens, which is an array, into the data[] array
    }
  }

  var jSONString = "[";
  if( quoted ) {
    for( var a=0; a<data.length; a++) {
      jSONString += "{\"countryName\":" + data[a][0] + ",";
      jSONString += "\"countryArea\":" + data[a][1] + ",";
      jSONString += "\"pop2010\":" + data[a][2] + ",";
      jSONString += "\"pop2011\":" + data[a][3] + ",";
      jSONString += "\"pop2012\":" + data[a][4] + ",";
      jSONString += "\"pop2013\":" + data[a][5] + ",";
      jSONString += "\"gdp2010\":" + data[a][6] + ",";
      jSONString += "\"gdp2011\":" + data[a][7] + ",";
      jSONString += "\"gdp2012\":" + data[a][8] + ",";
      jSONString += "\"gdp2013\":" + data[a][9] + ",";
      jSONString += "\"dppci2010\":" + data[a][10] + ",";
      jSONString += "\"dppci2011\":" + data[a][11] + ",";
      jSONString += "\"dppci2012\":" + data[a][12] + ",";
      jSONString += "\"dppci2013\":" + data[a][13] + ",";
      jSONString += "\"pPower2010\":" + data[a][14] + ",";
      jSONString += "\"pPower2011\":" + data[a][15] + ",";
      jSONString += "\"pPower2012\":" + data[a][16] + ",";
      jSONString += "\"pPower2013\":" + data[a][17] + "},";
    }
  } else {
    for( var a=0; a<data.length; a++) {
      jSONString += "{\"countryName\":\"" + data[a][0] + "\",";
      jSONString += "\"countryArea\":\"" + data[a][1] + "\",";
      jSONString += "\"pop2010\":\"" + data[a][2] + "\",";
      jSONString += "\"pop2011\":\"" + data[a][3] + "\",";
      jSONString += "\"pop2012\":\"" + data[a][4] + "\",";
      jSONString += "\"pop2013\":\"" + data[a][5] + "\",";
      jSONString += "\"gdp2010\":\"" + data[a][6] + "\",";
      jSONString += "\"gdp2011\":\"" + data[a][7] + "\",";
      jSONString += "\"gdp2012\":\"" + data[a][8] + "\",";
      jSONString += "\"gdp2013\":\"" + data[a][9] + "\",";
      jSONString += "\"dppci2010\":\"" + data[a][10] + "\",";
      jSONString += "\"dppci2011\":\"" + data[a][11] + "\",";
      jSONString += "\"dppci2012\":\"" + data[a][12] + "\",";
      jSONString += "\"dppci2013\":\"" + data[a][13] + "\",";
      jSONString += "\"pPower2010\":\"" + data[a][14] + "\",";
      jSONString += "\"pPower2011\":\"" + data[a][15] + "\",";
      jSONString += "\"pPower2012\":\"" + data[a][16] + "\",";
      jSONString += "\"pPower2013\":\"" + data[a][17] + "\"},";
    }
  }
  jSONString += "]";
  jSONString = jSONString.replace("},]","}]");
  // console.log(jSONString);
  // console.log(jSONString.length);
  globalData = JSON.parse(jSONString);
  if( confirm("Would you like to see the JSON Object in the console?") ) {
    console.log(globalData);
    console.log("Total objs in the array = " + globalData.length);
  }
}

function plotGraph() {
  var barheights = [], countryNames = [];
  for (var i = 1; i < 10; i++) {
    countryNames.push( globalData[i]["Country Name"] );
    barheights.push( globalData[i]["Population (Millions) - 2013"] );
  }
  console.log(barheights);
  var bars = document.getElementsByClassName('bar');
  for (var i = 0; i < bars.length; i++) {
    bars[i].style.height = Math.round(barheights[i]/3) + "px";
    bars[i].style.left = i*60 + 'px';
    bars[i].children[0].innerHTML = '<b>' + countryNames[i].substr(0,3) + '</b>';
  }
}

// document.getElementById('file').onchange = function(){
//
//   var file = this.files[0];
//
//   var reader = new FileReader();
//   reader.onload = function(progressEvent){
//     // Entire file
//     console.log(this.result);
//
//     // By noOfLines
//     var noOfLines = this.result.split('\n');
//     for(var line = 0; line < noOfLines.length; line++){
//       console.log(noOfLines[line]);
//     }
//   };
//   reader.readAsText(file);
// };
