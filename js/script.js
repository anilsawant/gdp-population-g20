var margin = {top: 20, right: 20, bottom: 140, left: 80},
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(19);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(16);

var populationTip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Population :</strong> <span style='color:red'>" + d.population2013 + " &times;10<sup>6</sup></span>";
  });

var gdpTip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>GDP : $</strong> <span style='color:red'>" + d.gdp2013 + "&times;10<sup>9</sup></span>";
  });

var purchasingPowerTip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>$</strong> <span style='color:red'>" + d.pp2013 + "&times;10<sup>9</sup></span>";
  });

var continentsPopTip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Population : </strong> <span style='color:red'>" + d.continentPopulation + "&times;10<sup>6</sup></span>";
  });

var continentGDPTip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>GDP :</strong> <span style='color:red'>" + d.continentGDP + "&times;10<sup>9</sup></span>";
  });
/*.............................................................................
                  Graph : Population in 2013 Vs Country
..............................................................................*/
var svg1 = d3.select("#graphWrap1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("border","1px solid #aaa")
    .style("box-shadow","inset 0 0 2px #aaa")
    .style("border-top-left-radius","3px")
    .style("border-top-right-radius","3px")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg1.call(populationTip);

d3.json("../data/jsons/countriesAndContinents.json", function( countriesAndContinents ) {

  var noOfCountries = countriesAndContinents.length;
  // Function to check whether an entry is a country
  function isCountry( countryName ) {
    for (var i = 0; i < noOfCountries; i++) {
      if( countryName.toUpperCase() == countriesAndContinents[i].country)
        return true;
    }
    return false;
  }


  // To read the graph 1 JSON
  d3.json("../data/jsons/graph11.json",function( data ) {

    // Filtering the parsed data to get the plotting data
    var plottingData = data.filter(function( countryDetails ) {
      if( isCountry(countryDetails.countryName.toUpperCase() ) ) {
        return countryDetails;
      }
    })
    var len = plottingData.length;

    // Using Bubble Sort to sort the data in Descending order
    for (var i = 0; i < len-1; i++) {
      for (var j = 0; j < len-i-1; j++) {
        if( parseFloat( plottingData[j].population2013 ) < parseFloat( plottingData[j+1].population2013 ) ) {
            var temp = plottingData[j];
            plottingData[j] = plottingData[j+1];
            plottingData[j+1] = temp;
        }
      }
    }

    x.domain( plottingData.map( function(d) { return d.countryName; } ) );
    y.domain( [0, parseFloat(plottingData[0].population2013) + 40] ); // After sorting the data in descending order

    svg1.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height + 5) + ")")
        .call(xAxis)
      .append("text")
        .attr("x", 420)
        .attr("y", 100)
        .attr("dy", ".71em")
        .style("font-size",20)
        .style("text-anchor", "middle")
        .text( data[0].countryName);

    d3.selectAll(".x .tick text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg1.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -200)
        .attr("y", -60)
        .attr("dy", ".71em")
        .style("font-size",20)
        .style("text-anchor", "middle")
        .text( data[0].population2013 );

    svg1.selectAll(".bar")
          .data( plottingData )
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.countryName); })
        .attr("width", 40)
        .attr("y", function(d) { return y(parseFloat(d.population2013)); })
        .attr("height", function(d) { return height - y(parseFloat(d.population2013)); })
        .on('mouseover', populationTip.show)
        .on('mouseout', populationTip.hide);
  });
});


/*.............................................................................
              Graph : Gross Domestic Product in 2013 Vs Country
..............................................................................*/
var svg2 = d3.select("#graphWrap2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("border","1px solid #aaa")
    .style("box-shadow","inset 0 0 2px #aaa")
    .style("border-top-left-radius","3px")
    .style("border-top-right-radius","3px")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg2.call( gdpTip );

d3.json("../data/jsons/countriesAndContinents.json", function( countriesAndContinents ) {

  var noOfCountries = countriesAndContinents.length;
  // Function to check whether an entry is a country
  function isCountry( countryName ) {
    for (var i = 0; i < noOfCountries; i++) {
      if( countryName.toUpperCase() == countriesAndContinents[i].country)
        return true;
    }
    return false;
  }


  // To read the graph 1 JSON
  d3.json("../data/jsons/graph12.json",function( data ) {

    // Filtering the parsed data to get the plotting data
    var plottingData = data.filter(function( countryDetails ) {
      if( isCountry(countryDetails.countryName.toUpperCase() ) ) {
        return countryDetails;
      }
    })
    var len = plottingData.length;

    // Using Bubble Sort to sort the data in Descending order
    for (var i = 0; i < len-1; i++) {
      for (var j = 0; j < len-i-1; j++) {
        if( parseFloat( plottingData[j].gdp2013 ) < parseFloat( plottingData[j+1].gdp2013 ) ) {
            var temp = plottingData[j];
            plottingData[j] = plottingData[j+1];
            plottingData[j+1] = temp;
        }
      }
    }

    x.domain( plottingData.map( function(d) { return d.countryName; } ) );
    y.domain( [0, parseFloat(plottingData[0].gdp2013) + 40] ); // After sorting the data in descending order

    svg2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height + 5) + ")")
        .call(xAxis)
      .append("text")
        .attr("x", 420)
        .attr("y", 100)
        .attr("dy", ".71em")
        .style("font-size",20)
        .style("text-anchor", "middle")
        .text( data[0].countryName );

    d3.selectAll(".x .tick text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg2.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -200)
        .attr("y", -60)
        .attr("dy", ".71em")
        .style("font-size",20)
        .style("text-anchor", "middle")
        .text( data[0].gdp2013 );

    svg2.selectAll(".bar")
          .data( plottingData )
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.countryName); })
        .attr("width", 40)
        .attr("y", function(d) { return y(parseFloat(d.gdp2013)); })
        .attr("height", function(d) { return height - y(parseFloat(d.gdp2013)); })
        .on('mouseover', gdpTip.show)
        .on('mouseout', gdpTip.hide);;
  });
});



/*.............................................................................
          Graph : Purchasing Power in 2013 Vs Country
..............................................................................*/
var svg3 = d3.select("#graphWrap3").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("border","1px solid #aaa")
    .style("box-shadow","inset 0 0 2px #aaa")
    .style("border-top-left-radius","3px")
    .style("border-top-right-radius","3px")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg3.call( purchasingPowerTip );

d3.json("../data/jsons/countriesAndContinents.json", function( countriesAndContinents ) {

  var noOfCountries = countriesAndContinents.length;
  // Function to check whether an entry is a country
  function isCountry( countryName ) {
    for (var i = 0; i < noOfCountries; i++) {
      if( countryName.toUpperCase() == countriesAndContinents[i].country)
        return true;
    }
    return false;
  }


  // To read the graph 1 JSON
  d3.json("../data/jsons/graph13.json",function( data ) {

    // Filtering the parsed data to get the plotting data
    var plottingData = data.filter(function( countryDetails ) {
      if( isCountry(countryDetails.countryName.toUpperCase() ) ) {
        return countryDetails;
      }
    })
    var len = plottingData.length;

    // Using Bubble Sort to sort the data in Descending order
    for (var i = 0; i < len-1; i++) {
      for (var j = 0; j < len-i-1; j++) {
        if( parseFloat( plottingData[j].pp2013 ) < parseFloat( plottingData[j+1].pp2013 ) ) {
            var temp = plottingData[j];
            plottingData[j] = plottingData[j+1];
            plottingData[j+1] = temp;
        }
      }
    }

    x.domain( plottingData.map( function(d) { return d.countryName; } ) );
    y.domain( [0, parseFloat(plottingData[0].pp2013) + 40] ); // After sorting the data in descending order

    svg3.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height + 5) + ")")
        .call(xAxis)
      .append("text")
        .attr("x", 420)
        .attr("y", 100)
        .attr("dy", ".71em")
        .style("font-size",20)
        .style("text-anchor", "middle")
        .text( data[0].countryName );

    d3.selectAll(".x .tick text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg3.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -220)
        .attr("y", -60)
        .attr("dy", ".71em")
        .style("font-size",20)
        .style("text-anchor", "middle")
        .text( data[0].pp2013 );

    svg3.selectAll(".bar")
          .data( plottingData )
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.countryName); })
        .attr("width", 40)
        .attr("y", function(d) { return y(parseFloat(d.pp2013)); })
        .attr("height", function(d) { return height - y(parseFloat(d.pp2013)); })
        .on('mouseover', purchasingPowerTip.show)
        .on('mouseout', purchasingPowerTip.hide);;
  });
});


/*.............................................................................
          Graph : GDP and Population by continent
..............................................................................
var svg5 = d3.select("#graphWrap5").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("border","1px solid #aaa")
    .style("box-shadow","inset 0 0 2px #aaa")
    .style("border-top-left-radius","3px")
    .style("border-top-right-radius","3px")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg5.call( continentsPopTip );
svg5.call( continentGDPTip );

d3.json("../data/jsons/countriesAndContinents.json", function( countriesAndContinents ) {

  var noOfCountries = countriesAndContinents.length;
  // To get continents array
  var continents = [];
  for (var i = 0; i < noOfCountries; i++) {
    var found = false;
    for (var j = 0; j < continents.length; j++) {
      if ( countriesAndContinents[i].continent == continents[j] ) {
        found = true;
        break;
      }
    }

    if ( !found ) {
      continents.push(countriesAndContinents[i].continent);
    }
  }

  // Function to check whether an entry is a country
  function isCountry( countryName ) {
    for (var i = 0; i < noOfCountries; i++) {
      if( countryName.toUpperCase() == countriesAndContinents[i].country)
        return true;
    }
    return false;
  }
  // Function to check whether an entry is a country
  function isUnion( countryName ) {
    for (var i = 0; i < noOfCountries; i++) {
      if( countryName.toUpperCase() == countriesAndContinents[i].union)
        return true;
    }
    return false;
  }

  // To read the graph 1 JSON
  d3.json("../data/jsons/continent_wise_graph.json",function( data ) {

    // Filtering the parsed data to get the plotting data
    var initialPlottingData = data.filter( function( countryDetails ) {
      if( isCountry( countryDetails.countryName.toUpperCase() ) || isUnion( countryDetails.countryName.toUpperCase() ) ) {
        return countryDetails;
      }
    })



    var plottingData = [];
      // // insert the headers in plottingData[]
      // var continentHeadersData = {
      //   continentName : "Continents",
      //   continentPopulation : "Population (2013)",
      //   continentGDP : "GDP (2013)"
      // };
      // plottingData.push( continentHeadersData );

    // To aggregate Population and GDP data for countries and add in plottingData
    var initialPlottingDataLen = initialPlottingData.length;
    for (var i = 0; i < continents.length; i++) {
      var continentData = {
        continentName : continents[i],
        continentPopulation : 0,
        continentGDP : 0
      };
      plottingData.push( continentData );
      for (var j = 0; j < initialPlottingDataLen; j++) {
        var country = initialPlottingData[j].countryName;
        for (var k = 0; k < noOfCountries; k++) {
          if ( country.toUpperCase() == countriesAndContinents[k].country &&  continents[i] == countriesAndContinents[k].continent ) {
            plottingData[i].continentPopulation += parseFloat( parseFloat( initialPlottingData[j].population2013 ).toPrecision(3) );
            plottingData[i].continentGDP += parseFloat( parseFloat( initialPlottingData[j].gdp2013 ).toPrecision(3) );
            break;
          }
        }// End For 3
      }// End For 2
    }// End For 1

    // To find the domain[] for y-axis
    var yDomainPopMax = plottingData[0].continentPopulation;
    for (var i = 0; i < plottingData.length; i++) {
      if ( yDomainPopMax < plottingData[i].continentPopulation ) {
        yDomainPopMax = plottingData[i].continentPopulation;
      }
    }
    var yDomainGDPMax = plottingData[0].continentGDP;
    for (var i = 0; i < plottingData.length; i++) {
      if ( yDomainGDPMax < plottingData[i].continentGDP ) {
        yDomainGDPMax = plottingData[i].continentGDP;
      }
    }
    var yDomainMax = yDomainGDPMax > yDomainPopMax ? yDomainGDPMax : yDomainPopMax; // Get the max out of the two
    x.domain( continents );
    y.domain( [0, yDomainMax + 40] );

    svg5.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height + 5) + ")")
        .call(xAxis)
      .append("text")
        .attr("x", 420)
        .attr("y", 100)
        .attr("dy", ".71em")
        .style("font-size",20)
        .style("text-anchor", "middle")
        .text( "Continents" );

    d3.selectAll(".x .tick text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg5.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -220)
        .attr("y", -60)
        .attr("dy", ".71em")
        .style("font-size",20)
        .style("text-anchor", "middle")
        .text( "Population (2013) in Millions & GDP in Billions" );

    svg5.selectAll(".populationBar")
          .data( plottingData )
      .enter().append("rect")
        .attr("class", "bar populationBar")
        .attr("x", function(d) { return x(d.continentName); })
        .attr("width", 60)
        .attr("y", function(d) { return y(parseFloat(d.continentPopulation)); })
        .attr("height", function(d) { return height - y(parseFloat(d.continentPopulation)); })
        .on('mouseover', continentsPopTip.show)
        .on('mouseout', continentsPopTip.hide);;

    svg5.selectAll(".gDPBar")
          .data( plottingData )
      .enter().append("rect")
        .attr("class", "bar gDPBar")
        .attr("x", function(d) { return x(d.continentName) + 62; })
        .attr("width", 60)
        .attr("y", function(d) { return y(parseFloat(d.continentGDP)); })
        .attr("height", function(d) { return height - y(parseFloat(d.continentGDP)); })
        .on('mouseover', continentGDPTip.show)
        .on('mouseout', continentGDPTip.hide);;
  });
});
*/


/*.............................................................................
          Graph : GDP and Population by continent
..............................................................................*/
var svg6 = d3.select("#graphWrap6").append("svg")
    .attr("width", width + margin.left + margin.right + 60)
    .attr("height", height + margin.top + margin.bottom)
    .style("border","1px solid #aaa")
    .style("box-shadow","inset 0 0 2px #aaa")
    .style("border-top-left-radius","3px")
    .style("border-top-right-radius","3px")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg6.call( continentsPopTip );
svg6.call( continentGDPTip );

d3.json("../data/jsons/countriesAndContinents.json", function( countriesAndContinents ) {

  var noOfCountries = countriesAndContinents.length;
  // To get continents array
  var continents = [];
  for (var i = 0; i < noOfCountries; i++) {
    var found = false;
    for (var j = 0; j < continents.length; j++) {
      if ( countriesAndContinents[i].continent == continents[j] ) {
        found = true;
        break;
      }
    }

    if ( !found ) {
      continents.push(countriesAndContinents[i].continent);
    }
  }

  // Function to check whether an entry is a country
  function isCountry( countryName ) {
    for (var i = 0; i < noOfCountries; i++) {
      if( countryName.toUpperCase() == countriesAndContinents[i].country)
        return true;
    }
    return false;
  }
  // Function to check whether an entry is a country
  function isUnion( countryName ) {
    for (var i = 0; i < noOfCountries; i++) {
      if( countryName.toUpperCase() == countriesAndContinents[i].union)
        return true;
    }
    return false;
  }

  // To read the graph 1 JSON
  d3.json("../data/jsons/continent_wise_graph.json",function( data ) {

    // Filtering the parsed data to get the plotting data
    var initialPlottingData = data.filter( function( countryDetails ) {
      if( isCountry( countryDetails.countryName.toUpperCase() ) || isUnion( countryDetails.countryName.toUpperCase() ) ) {
        return countryDetails;
      }
    })



    var plottingData = [];
      // // insert the headers in plottingData[]
      // var continentHeadersData = {
      //   continentName : "Continents",
      //   continentPopulation : "Population (2013)",
      //   continentGDP : "GDP (2013)"
      // };
      // plottingData.push( continentHeadersData );

    // To aggregate Population and GDP data for countries and add in plottingData
    var initialPlottingDataLen = initialPlottingData.length;
    for (var i = 0; i < continents.length; i++) {
      var continentData = {
        continentName : continents[i],
        continentPopulation : 0,
        continentGDP : 0
      };
      plottingData.push( continentData );
      for (var j = 0; j < initialPlottingDataLen; j++) {
        var country = initialPlottingData[j].countryName;
        for (var k = 0; k < noOfCountries; k++) {
          if ( country.toUpperCase() == countriesAndContinents[k].country &&  continents[i] == countriesAndContinents[k].continent ) {
            plottingData[i].continentPopulation += parseFloat( parseFloat( initialPlottingData[j].population2013 ).toPrecision(3) );
            plottingData[i].continentGDP += parseFloat( parseFloat( initialPlottingData[j].gdp2013 ).toPrecision(3) );
            break;
          }
        }// End For 3
      }// End For 2
    }// End For 1

    // To find the domain[] for y-axis
    var yDomainPopMax = plottingData[0].continentPopulation;
    for (var i = 0; i < plottingData.length; i++) {
      if ( yDomainPopMax < plottingData[i].continentPopulation ) {
        yDomainPopMax = plottingData[i].continentPopulation;
      }
    }
    var yDomainGDPMax = plottingData[0].continentGDP;
    for (var i = 0; i < plottingData.length; i++) {
      if ( yDomainGDPMax < plottingData[i].continentGDP ) {
        yDomainGDPMax = plottingData[i].continentGDP;
      }
    }

    var yGDP = d3.scale.linear()
        .range([height, 0])
        .domain([0,yDomainGDPMax + 40]);

    var yGDPAxis = d3.svg.axis()
        .scale(yGDP)
        .orient("left")
        .ticks(16);


    x.domain( continents );
    y.domain( [0, yDomainPopMax + 40] );


    svg6.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height + 5) + ")")
        .call(xAxis)
      .append("text")
        .attr("x", 420)
        .attr("y", 100)
        .attr("dy", ".71em")
        .style("font-size",20)
        .style("text-anchor", "middle")
        .text( "Continents" );

    d3.selectAll(".x .tick text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg6.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -220)
        .attr("y", -60)
        .attr("dy", ".71em")
        .style("font-size",20)
        .style("text-anchor", "middle")
        .text( "Population (2013) in Millions" );

        // Y-axiss for GDP
    svg6.append("g")
        .attr("class", "y axis rt-axis")
        .attr("transform","translate(860,0)")
        .call(yGDPAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -200)
        .attr("y", 55)
        .attr("dy", ".71em")
        .style("font-size",20)
        .style("text-anchor", "middle")
        .text( "GDP(2013) in Billions" );

    svg6.selectAll(".rt-axis line")
        .attr("x2",6);

    svg6.selectAll(".rt-axis .tick text")
        .attr("x",9)
        .style("text-anchor","start");

    svg6.select(".rt-axis path")
        .attr("d","M6,0H0V440H6");

    svg6.selectAll(".populationBar")
          .data( plottingData )
      .enter().append("rect")
        .attr("class", "bar populationBar")
        .attr("x", function(d) { return x(d.continentName); })
        .attr("width", 60)
        .attr("y", function(d) { return y(parseFloat(d.continentPopulation)); })
        .attr("height", function(d) { return height - y(parseFloat(d.continentPopulation)); })
        .on('mouseover', continentsPopTip.show)
        .on('mouseout', continentsPopTip.hide);

    svg6.selectAll(".gDPBar")
          .data( plottingData )
      .enter().append("rect")
        .attr("class", "bar gDPBar")
        .attr("x", function(d) { return x(d.continentName) + 62; })
        .attr("width", 60)
        .attr("y", function(d) { return yGDP(parseFloat(d.continentGDP)); })
        .attr("height", function(d) { return height - yGDP(parseFloat(d.continentGDP)); })
        .on('mouseover', continentGDPTip.show)
        .on('mouseout', continentGDPTip.hide);

    svg6.append("rect")
        .attr("height",15)
        .attr("width",15)
        .attr("fill","#a54dff")
        .attr("x", 10);


    svg6.append("rect")
        .attr("height",15)
        .attr("width",15)
        .attr("fill","#3399ff")
        .attr("x", 100);

    svg6.append("text")
        .attr("class","legend-text")
        .text("Population")
        .attr("x", 30)
        .attr("y", 13);

    svg6.append("text")
        .attr("class","legend-text")
        .text("GDP")
        .attr("x", 120)
        .attr("y", 13);

  });
});
