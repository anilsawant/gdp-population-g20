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

// Growth Graph tooltips
var growthPop2011Tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>2010-2011:</strong> <span style='color:red'>" + d.popGrowth2011 + "&times;10<sup>6</sup></span>";
  });

var growthPop2012Tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>2011-2012 :</strong> <span style='color:red'>" + d.popGrowth2012 + "&times;10<sup>6</sup></span>";
  });

var growthPop2013Tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>2012-2013:</strong> <span style='color:red'>" + d.popGrowth2013 + "&times;10<sup>6</sup></span>";
  });

  var growthPp2011Tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<strong>2010-2011:</strong> <span style='color:red'>" + d.ppGrowth2011 + "&times;10<sup>9</sup></span>";
    });

  var growthPp2012Tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<strong>2011-2012 :</strong> <span style='color:red'>" + d.ppGrowth2012 + "&times;10<sup>9</sup></span>";
    });

  var growthPp2013Tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<strong>2012-2013:</strong> <span style='color:red'>" + d.ppGrowth2013 + "&times;10<sup>9</sup></span>";
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

d3.json("data/jsons/countriesAndContinents.json", function( countriesAndContinents ) {

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
  d3.json("data/jsons/graph123.json",function( data ) {

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

d3.json("data/jsons/countriesAndContinents.json", function( countriesAndContinents ) {

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
  d3.json("data/jsons/graph123.json",function( data ) {

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

d3.json("data/jsons/countriesAndContinents.json", function( countriesAndContinents ) {

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
  d3.json("data/jsons/graph123.json",function( data ) {

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
      Graph : Growth in Population and Purchasing Power from 2010 to 2013
..............................................................................*/
var svg4 = d3.select("#graphWrap4").append("svg")
    .attr("width", width + margin.left + margin.right + 100)
    .attr("height", height + margin.top + margin.bottom)
    .style("border","1px solid #aaa")
    .style("box-shadow","inset 0 0 2px #aaa")
    .style("border-top-left-radius","3px")
    .style("border-top-right-radius","3px")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg4.call( growthPp2011Tip );
svg4.call( growthPp2012Tip );
svg4.call( growthPp2013Tip );
svg4.call( growthPop2011Tip );
svg4.call( growthPop2012Tip );
svg4.call( growthPop2013Tip );


d3.json("data/jsons/countriesAndContinents.json", function( countriesAndContinents ) {

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
  d3.json("data/jsons/pop_pp_growth_graph.json",function( data ) {

    // Filtering the parsed data to get the plotting data
    var initialPlottingData = data.filter(function( countryDetails ) {
      if( isCountry(countryDetails.countryName.toUpperCase() ) ) {
        return countryDetails;
      }
    })
    var len = initialPlottingData.length;
    var plottingData = [];
    for (var i = 0; i < len; i++) {
      var countryGrowth = {
        countryName : initialPlottingData[i].countryName,
        popGrowth2011 : parseFloat(( parseFloat( initialPlottingData[i].population2011 ) - parseFloat( initialPlottingData[i].population2010 ) ).toPrecision(3)),
        popGrowth2012 : parseFloat(( parseFloat( initialPlottingData[i].population2012 ) - parseFloat( initialPlottingData[i].population2011 ) ).toPrecision(3)),
        popGrowth2013 : parseFloat(( parseFloat( initialPlottingData[i].population2013 ) - parseFloat( initialPlottingData[i].population2012 ) ).toPrecision(3)),
        ppGrowth2011 : parseFloat(( parseFloat( initialPlottingData[i].pp2011 ) - parseFloat( initialPlottingData[i].pp2010 ) ).toPrecision(3)),
        ppGrowth2012 : parseFloat(( parseFloat( initialPlottingData[i].pp2012 ) - parseFloat( initialPlottingData[i].pp2011 ) ).toPrecision(3)),
        ppGrowth2013 : parseFloat(( parseFloat( initialPlottingData[i].pp2013 ) - parseFloat( initialPlottingData[i].pp2012 ) ).toPrecision(3))
      }
      plottingData.push( countryGrowth );
    }
    console.log( plottingData );
    // // Using Bubble Sort to sort the data in Descending order
    // for (var i = 0; i < len-1; i++) {
    //   for (var j = 0; j < len-i-1; j++) {
    //     if( parseFloat( plottingData[j].pp2013 ) < parseFloat( plottingData[j+1].pp2013 ) ) {
    //         var temp = plottingData[j];
    //         plottingData[j] = plottingData[j+1];
    //         plottingData[j+1] = temp;
    //     }
    //   }
    // }

        // To find the domain[] for y-axis
        var yDomainPopMax = plottingData[0].popGrowth2011 + plottingData[0].popGrowth2012 + plottingData[0].popGrowth2013;
        for (var i = 1; i < plottingData.length; i++) {
          if ( yDomainPopMax < ( plottingData[i].popGrowth2011 + plottingData[i].popGrowth2012 + plottingData[i].popGrowth2013 )) {
            yDomainPopMax = plottingData[i].popGrowth2011 + plottingData[i].popGrowth2012 + plottingData[i].popGrowth2013;
          }
        }
        console.log("yDomainPopMax = " + yDomainPopMax);
        var yDomainPPMax = plottingData[0].ppGrowth2011 + plottingData[0].ppGrowth2012 + plottingData[0].ppGrowth2013;
        for (var i = 1; i < plottingData.length; i++) {
          if ( yDomainPPMax < ( plottingData[i].ppGrowth2011 + plottingData[i].ppGrowth2012 + plottingData[i].ppGrowth2013 ) ) {
            yDomainPPMax = plottingData[i].ppGrowth2011 + plottingData[i].ppGrowth2012 + plottingData[i].ppGrowth2013;
          }
        }
        console.log("yDomainPPMax = " + yDomainPPMax);

        x.domain( plottingData.map( function( country ){ return country.countryName; }) );

        var yPop = d3.scale.linear()
            .range([height, 0])
            .domain( [0, yDomainPopMax + 2] );

        var yPopAxis = d3.svg.axis()
            .scale(yPop)
            .orient("left")
            .ticks(16);

        var yPP = d3.scale.linear()
            .range([height, 0])
            .domain([0,yDomainPPMax + 40]);

        var yPPAxis = d3.svg.axis()
            .scale(yPP)
            .orient("left")
            .ticks(16);

        svg4.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (height + 5) + ")")
            .call(xAxis)
          .append("text")
            .attr("x", 420)
            .attr("y", 100)
            .attr("dy", ".71em")
            .style("font-size",20)
            .style("text-anchor", "middle")
            .text( "Countries" );

        d3.selectAll(".x .tick text")
          .attr("transform", "rotate(-45)")
          .style("text-anchor", "end");

        svg4.append("g")
            .attr("class", "y axis")
            .call(yPopAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -220)
            .attr("y", -60)
            .attr("dy", ".71em")
            .style("font-size",20)
            .style("text-anchor", "middle")
            .text( "Population Growth in Millions" );

            // Y-axiss for PP
        svg4.append("g")
            .attr("class", "y axis rt-axis")
            .attr("transform","translate(860,0)")
            .call(yPPAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -200)
            .attr("y", 55)
            .attr("dy", ".71em")
            .style("font-size",20)
            .style("text-anchor", "middle")
            .text( "Purchasing Power Growth in Billions" );

        svg4.selectAll(".rt-axis line")
            .attr("x2",6);

        svg4.selectAll(".rt-axis .tick text")
            .attr("x",9)
            .style("text-anchor","start");

        svg4.select(".rt-axis path")
            .attr("d","M6,0H0V440H6");

        svg4.selectAll(".populationBar2011")
              .data( plottingData )
          .enter().append("rect")
            .attr("class", "bar populationBar2011")
            .attr("x", function(d) { return x(d.countryName) + 4; })
            .attr("width", 16)
            .attr("y", function(d) { return yPop(parseFloat(d.popGrowth2011)); })
            .attr("height", function(d) { return height - yPop(parseFloat(d.popGrowth2011) > 0 ? parseFloat(d.popGrowth2011) : -parseFloat(d.popGrowth2011) ); })
            .on('mouseover', growthPop2011Tip.show)
            .on('mouseout', growthPop2011Tip.hide);

        svg4.selectAll(".populationBar2012")
              .data( plottingData )
          .enter().append("rect")
            .attr("class", "bar populationBar2012")
            .attr("x", function(d) { return x(d.countryName) + 4; })
            .attr("width", 16)
            .attr("y", function(d) { return yPop(parseFloat(d.popGrowth2011) + parseFloat(d.popGrowth2012) );  })
            .attr("height", function(d) {
              return height - ( yPop( parseFloat(d.popGrowth2012) > 0 ? parseFloat(d.popGrowth2012) : -parseFloat(d.popGrowth2012)) );
            })
            .on('mouseover', growthPop2012Tip.show)
            .on('mouseout', growthPop2012Tip.hide);

        svg4.selectAll(".populationBar2013")
              .data( plottingData )
          .enter().append("rect")
            .attr("class", "bar populationBar2013")
            .attr("x", function(d) { return x(d.countryName) + 4; })
            .attr("width", 16)
            .attr("y", function(d) { return yPop(parseFloat(d.popGrowth2011) + parseFloat(d.popGrowth2012) + parseFloat(d.popGrowth2013) );  })
            .attr("height", function(d) { return height - yPop( parseFloat(d.popGrowth2013) > 0 ? parseFloat(d.popGrowth2013) : -parseFloat(d.popGrowth2013) ); })
            .on('mouseover', growthPop2013Tip.show)
            .on('mouseout', growthPop2013Tip.hide);

        svg4.selectAll(".pPBar2011")
              .data( plottingData )
          .enter().append("rect")
            .attr("class", "bar pPBar2011")
            .attr("x", function(d) { return x(d.countryName) + 22; })
            .attr("width", 16)
            .attr("y", function(d) { return yPP(parseFloat(d.ppGrowth2011)); })
            .attr("height", function(d) { return height - yPP(parseFloat(d.ppGrowth2011)); })
            .on('mouseover', growthPp2011Tip.show)
            .on('mouseout', growthPp2011Tip.hide);

        svg4.selectAll(".pPBar2012")
              .data( plottingData )
          .enter().append("rect")
            .attr("class", "bar pPBar2012")
            .attr("x", function(d) { return x(d.countryName) + 22; })
            .attr("width", 16)
            .attr("y", function(d) { return yPP(parseFloat(d.ppGrowth2011) + parseFloat(d.ppGrowth2012) ); })
            .attr("height", function(d) { return height - yPP(parseFloat(d.ppGrowth2012)); })
            .on('mouseover', growthPp2012Tip.show)
            .on('mouseout', growthPp2012Tip.hide);

        svg4.selectAll(".pPBar2013")
              .data( plottingData )
          .enter().append("rect")
            .attr("class", "bar pPBar2013")
            .attr("x", function(d) { return x(d.countryName) + 22; })
            .attr("width", 16)
            .attr("y", function(d) { return yPP(parseFloat(d.ppGrowth2011) + parseFloat(d.ppGrowth2012) + parseFloat(d.ppGrowth2013)); })
            .attr("height", function(d) { return height - yPP(parseFloat(d.ppGrowth2013)); })
            .on('mouseover', growthPp2013Tip.show)
            .on('mouseout', growthPp2013Tip.hide);

    var populationLegend =  svg4.append("g");
        populationLegend.append("text")
            .attr("class","legend-text")
            .text("Population Growth")
            .attr("x", 10)
            .attr("y", -10);

        populationLegend.append("rect")
            .attr("height",15)
            .attr("width",15)
            .attr("fill","#80ccff")
            .attr("x", 10)
            .attr("y", 5);
        populationLegend.append("text")
            .attr("class","legend-text")
            .text("2012-2013")
            .attr("x", 30)
            .attr("y", 18);

        populationLegend.append("rect")
            .attr("height",15)
            .attr("width",15)
            .attr("fill","#4db8ff")
            .attr("x", 10)
            .attr("y", 35);
        populationLegend.append("text")
            .attr("class","legend-text")
            .text("2011-2012")
            .attr("x", 30)
            .attr("y", 48);

        populationLegend.append("rect")
            .attr("height",15)
            .attr("width",15)
            .attr("fill","#0099ff")
            .attr("x", 10)
            .attr("y", 65);
        populationLegend.append("text")
            .attr("class","legend-text")
            .text("2010-2011")
            .attr("x", 30)
            .attr("y", 78);

        var purPowerLegend = svg4.append("g")
                                .attr("transform", "translate(680,0)");

        purPowerLegend.append("text")
            .attr("class","legend-text")
            .text("Purchasing Power Growth")
            .attr("x", 43)
            .attr("y", -10);

        purPowerLegend.append("rect")
            .attr("height",15)
            .attr("width",15)
            .attr("fill","#ffe680")
            .attr("x", 155)
            .attr("y", 5);
        purPowerLegend.append("text")
            .attr("class","legend-text")
            .text("2012-2013")
            .attr("x", 100)
            .attr("y", 18);

        purPowerLegend.append("rect")
            .attr("height",15)
            .attr("width",15)
            .attr("fill","#ffdb4d")
            .attr("x", 155)
            .attr("y", 35);
        purPowerLegend.append("text")
            .attr("class","legend-text")
            .text("2011-2012")
            .attr("x", 100)
            .attr("y", 48);


        purPowerLegend.append("rect")
            .attr("height",15)
            .attr("width",15)
            .attr("fill","#ffcc00")
            .attr("x", 155)
            .attr("y", 65);
        purPowerLegend.append("text")
            .attr("class","legend-text")
            .text("2010-2011")
            .attr("x", 100)
            .attr("y", 78);


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

d3.json("data/jsons/countriesAndContinents.json", function( countriesAndContinents ) {

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
  d3.json("data/jsons/continent_wise_graph.json",function( data ) {

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

d3.json("data/jsons/countriesAndContinents.json", function( countriesAndContinents ) {

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
  d3.json("data/jsons/continent_wise_graph.json",function( data ) {

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
