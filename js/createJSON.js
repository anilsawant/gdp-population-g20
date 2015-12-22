var fs = require("fs");

// Create the base directory to hold all the jsons
var jSONDirExists = createJSONDirectory();

// Save the continent names in a JSON
createContinentsJSON();

// Save the Country and continent mapping
createCountriesAndContinentJSON();

// function call to create the JSON String representation of the data
createJSONFromFile( '../data/raw_data_1.csv');  // accepts the raw content,new-line character, delimiter, and whether data is by default surrounded by quotes("")

// function to create a JSON String
function createJSONFromFile( file ) {
  var fileName = file.substr( file.lastIndexOf("/") + 1, file.length );
  console.log("Started reading file " + file );
  var rawData = fs.readFileSync( file );
  console.log("Completed reading file " + file );

  rawData = rawData.toString();

  // Various parameters for createJSONFromFile() function
  var newLineCharacter = "\n";
  if( rawData.indexOf("\r\n") != -1 )
    newLineCharacter = "\r\n";
  var delim = ",";
  var isDataQuoted = false;
  if( rawData.indexOf("\"") != -1 )
    isDataQuoted = true;

  var lines = rawData.split( newLineCharacter );
  var noOfLines = lines.length;
  var noOfCols = ( lines[0].split( delim ) ).length;
  var noOfRows = 0;
  var processedData = [];
  for( var i = 0; i < noOfLines; i++ ) {
    var line = lines[i];
    if( line != null && line != '' && line.length != 0 ) {
      noOfRows ++;
      var tokens = line.split( delim );
      processedData.push( tokens ); // pushes a line of tokens, which is an array, into the processedData[] array
    }
  }

  var headers = [];
  for (var i = 0; i < noOfCols; i++) {
    headers[i] = processedData[0][i];
  }

  var jSONString = "[";
  if( isDataQuoted ) {
    for( var a = 1; a < noOfRows; a++) {
      jSONString += "{";
      for (var b = 0; b < noOfCols; b++) {
        jSONString += headers[b]  + ":" + processedData[a][b] + ",";
      }
      jSONString += "},";
      jSONString = jSONString.replace(",},","},");
    }
  } else {
    for( var a = 1; a < noOfRows; a++) {
      jSONString += "{";
      for (var b = 0; b < noOfCols; b++) {
        jSONString += "\"" + headers[b] + "\":\"" + processedData[a][b] + "\"" + ",";
      }
      jSONString += "},";
      jSONString = jSONString.replace(",},","},");
    }
  }
  jSONString += "]";
  jSONString = jSONString.replace("},]","}]");

  writeJSONToDisk( fileName, jSONString );// Write to disk

} // End createJSONFromFile


// Function to create 'data/jsons' directory
function createJSONDirectory() {
  // Check if 'jsons' directory exists
  var dirStats = fs.statSync('../data/jsons');
  if ( dirStats.isDirectory() ) {
    // console.log("Directory already exists!");
    return true;
  } else {
    // Creating the directory to store JSON files
    fs.mkdir('../data/jsons', function( err ) {
      if( err ) {
        return console.error( err );;
      }
      // console.log("Directory created successfully!");
      return true;
    });
  }
} // End createJSONDirectory()


// Function to create continents JSON
function createContinentsJSON() {
  // var continents = ["\"AFRICA\"","\"ANTARCTICA\"","\"ASIA\"","\"AUSTRALIA\"","\"EUROPE\"","\"NORTH AMERICA\"","\"SOUTH AMERICA\""];
  var continents = ["AFRICA","ANTARCTICA","ASIA","AUSTRALIA","EUROPE","NORTH AMERICA","SOUTH AMERICA"];
  writeJSONToDisk("continents", JSON.stringify( continents ) );
} // End createContinentsJSON()

// Function to create a JSON representing the mapping between Country and its continent
function createCountriesAndContinentJSON() {
  //var continents = ["AFRICA","ANTARCTICA","ASIA","AUSTRALIA","EUROPE","NORTH AMERICA","SOUTH AMERICA"];
  var content = fs.readFileSync('../data/jsons/continents.json');
  var continents = JSON.parse( content.toString() );
  var countriesAndContinents = [
     { country:"ARGENTINA", continent:continents[6] },
     { country:"AUSTRALIA", continent:continents[3] },
     { country:"BRAZIL", continent:continents[6] },
     { country:"CANADA", continent:continents[5] },
     { country:"CHINA", continent:continents[2] },
     { country:"FRANCE", continent:continents[4] },
     { country:"GERMANY", continent:continents[4] },
     { country:"INDIA", continent:continents[2] },
     { country:"INDONESIA", continent:continents[2] },
     { country:"ITALY", continent:continents[4] },
     { country:"JAPAN", continent:continents[2] },
     { country:"MEXICO", continent:continents[5] },
     { country:"RUSSIA", continent:continents[2] },
     { country:"SAUDI ARABIA", continent:continents[2] },
     { country:"SOUTH AFRICA", continent:continents[0] },
     { country:"REPUBLIC OF KOREA", continent:continents[2] },
     { country:"TURKEY", continent:continents[2] },
     { country:"UNITED KINGDOM", continent:continents[4] },
     { country:"USA", continent:continents[5] }
     ];

    writeJSONToDisk('countriesAndContinents', JSON.stringify( countriesAndContinents ) );
} // End createCountriesAndContinentJSON()

// Function to write the contents to disk
function writeJSONToDisk( fileName, content ) {
  var jSONFileName = fileName + '.json';

  if( jSONDirExists ) {
    fs.writeFileSync('../data/jsons/' + jSONFileName, content );
    console.log("Completed writing \"" + fileName + "\" to data/jsons/" + jSONFileName);
  } else {
    console.log("Could not write " + fileName + " to disk. data/jsons directory does not exist.");
  }
} // End writeJSONToDisk()
