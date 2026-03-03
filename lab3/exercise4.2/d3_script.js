
// Step 2: Apply style to HTML elements using D3
// Select and style the h1 element
d3.select("h1")
  .style("color", "#2c3e50")
  .style("font-size", "2.5em")
  .style("text-align", "center");

// Select and style the h3 elements
d3.selectAll("h3")
  .style("color", "#ae279c");


// Style the section divs
d3.selectAll(".section")
  .style("border-left", "4px solid #2980b9");


// Step 3: Append elements using D3
// Add a paragraph to the content div with information about TV energy
d3.select("#content-div")
  .append("p")
  .text("Purchasing a low energy consumption TV will help with your energy bills!")
  .style("color", "#27ae60")
  .style("font-weight", "bold")
  .style("margin-top", "10px");

// Add another paragraph with additional information
d3.select("#content-div")
  .append("p")
  .text("Australian Star Ratings help you identify efficient models. Higher star ratings mean lower running costs!")
  .style("color", "#2980b9")
  .style("margin-top", "10px");

// Demonstrate selectAll - add a note to all section divs
d3.selectAll(".section")
  .append("div")
  .style("margin-top", "15px")
  .style("padding", "10px")
  .style("background-color", "#ecf0f1")
  .style("border-radius", "3px")
  .style("font-size", "0.9em")
  .style("color", "#555")
  .text("This section has been enhanced with D3");


// Step 4: Append SVG elements using D3
// Select the SVG and add rectangles and other shapes

// Add a rectangle
d3.select("svg")
  .append("rect")
  .attr("x", 50)
  .attr("y", 50)
  .attr("width", 100)
  .attr("height", 30)
  .style("fill", "#2ecc71");

// Add another rectangle with different styling
d3.select("svg")
  .append("rect")
  .attr("x", 180)
  .attr("y", 50)
  .attr("width", 100)
  .attr("height", 30)
  .style("fill", "#3498db");

// Add a third rectangle
d3.select("svg")
  .append("rect")
  .attr("x", 310)
  .attr("y", 50)
  .attr("width", 50)
  .attr("height", 30)
  .style("fill", "#e74c3c");

// Add circles to represent different TV sizes
d3.select("svg")
  .append("circle")
  .attr("cx", 100)
  .attr("cy", 120)
  .attr("r", 20)
  .style("fill", "#f39c12")
  .style("opacity", 0.7);

d3.select("svg")
  .append("circle")
  .attr("cx", 200)
  .attr("cy", 120)
  .attr("r", 30)
  .style("fill", "#9b59b6")
  .style("opacity", 0.7);

d3.select("svg")
  .append("circle")
  .attr("cx", 300)
  .attr("cy", 120)
  .attr("r", 25)
  .style("fill", "#1abc9c")
  .style("opacity", 0.7);


