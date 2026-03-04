
d3.select("h1")
  .style("color", "#2c3e50")
  .style("font-size", "2.5em")
  .style("text-align", "center");

// Select and style the h3 elements
d3.selectAll("h3")
  .style("color", "#ae279c");

// Step 3: Create SVG object within the responsive container
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 1200 1600")
    .style("border", "1px solid black");

// Step 4: Add a test SVG rectangle
svg
    .append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");

