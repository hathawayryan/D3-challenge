// Define SVG area dimensions
var svgWidth = 800;
var svgHeight = 600;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 50,
  left: 50
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select scatter div, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// @TODO: YOUR CODE HERE!
d3.csv("assets/data/data.csv").then(function(data) {

    // Print the tvData
    console.log(data);  

    data.forEach(function(data) {
        data.obesity = +data.obesity;
        data.income = +data.income;

    });

    var obesity_income_data = [];
    data.forEach(function(data) {
        obesity_income_data.push([data.income, data.obesity, data.abbr]);
    });

    console.log(obesity_income_data);

    var xLinearScale = d3.scaleLinear()
    .domain([30000, 80000])
    .range([0, chartWidth]);

    var yLinearScale = d3.scaleLinear()
    .domain([0, 40])
    .range([chartHeight, 0]);

    // Create two new functions passing the scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Add circles from data
    svg.selectAll("circle")
    .data(obesity_income_data)
    .enter()
    .append("circle")
    .attr("r", 12)  // Radius
    .attr("cx", function(d) {
        return xLinearScale(d[0]);  // Returns scaled circle x
    })
    .attr("cy", function(d) {
        return yLinearScale(d[1]);  // Returns scaled circle y
    })
    .attr("stroke-width", 1)      // Circle Border
    .attr("stroke", "gray")        // Circle border color
    .attr("fill", "skyblue");  // Circle Color

    // Add Text Labels
    svg.selectAll("text")
    .data(obesity_income_data)
    .enter()
    .append("text")
    .text(function(d) {
        return d[2];
    })
    .attr("x", function(d) {
        return (xLinearScale(d[0])-7);  // Returns scaled location of x
    })
    .attr("y", function(d) {
        return (yLinearScale(d[1])+4);  // Returns scaled circle y
    })
    .attr("font_family", "sans-serif")  // Font type
    .attr("font-size", "11px")  // Font size
    .attr("fill", "white");   // Font color

    svg.append("text")      // text label for the x axis
        .attr("x", 400 )
        .attr("y",  590 )
        .style("text-anchor", "middle")
        .text("Income ($)");

    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 5)
    .attr("x", -280)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Obesity (%)");

    // Append an SVG group element to the chartGroup, create the left axis inside of it
    chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);

    // Append an SVG group element to the chartGroup, create the bottom axis inside of it
    // Translate the bottom axis to the bottom of the page
    chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

    // // Append axes titles
    // chartGroup.append("text")
    // .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 20})`)
    //     .classed("chart text", true)
    //     .text("Dow Index");

}).catch(function(error) {
console.log(error);
});
  