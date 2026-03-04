// Define SVG dimensions and constants
const svgWidth = 700;
const svgHeight = 400;
const barHeight = 30;
const barPadding = 10;
const labelWidth = 90;
const valueWidth = 50;

// Create SVG inside the #chart container
const svg = d3.select("#chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .style("background", "#fafafa")
  .style("border", "1px solid #ccc");

// Load data from CSV
d3.csv("data/BrandTV.csv", d => ({
  brand: d["Brand"],
  count: +d["Count"]
})).then(data => {
  console.log("Loaded data:", data);
  console.log("Data length:", data.length);
  console.log("Max count:", d3.max(data, d => d.count));
  console.log("Min count:", d3.min(data, d => d.count));

  // Sort data by count in descending order
  data.sort((a, b) => d3.descending(a.count, b.count));
  console.log("Sorted data:", data);

  // Call the bar chart visualization
  createBarChart(data);
});

// Create and draw bar chart with data binding
const createBarChart = (data) => {
  console.log("Creating bar chart with data:", data);
  
  // Calculate scale for bar width (max count determines the scale)
  const maxCount = d3.max(data, d => d.count);
  const barWidth = (svgWidth - labelWidth - valueWidth - 20) / maxCount;
  
  // STEP 1: Bind data to DOM elements (rectangles)
  svg.selectAll("rect")
    .data(data)
    .join("rect")
    // Add class attribute with count data
    .attr("class", d => `bar bar-${d.count}`)
    // STEP 2: Add attributes for width and height
    .attr("x", labelWidth + 10) // x position: constant (left padding for labels)
    .attr("y", (d, i) => i * (barHeight + barPadding)) // STEP 3: y position with spacing
    .attr("width", d => d.count * barWidth) // width based on data
    .attr("height", barHeight); // height is constant
  
  // Add brand labels on the left
  svg.selectAll("text.label")
    .data(data)
    .join("text")
    .attr("class", "label")
    .attr("x", labelWidth)
    .attr("y", (d, i) => i * (barHeight + barPadding) + barHeight / 2)
    .attr("dy", "0.35em") // vertical alignment
    .text(d => d.brand);
  
  // Add count values on the right
  svg.selectAll("text.value")
    .data(data)
    .join("text")
    .attr("class", "value")
    .attr("x", (d) => labelWidth + 10 + d.count * barWidth + 5) // positioned after bar
    .attr("y", (d, i) => i * (barHeight + barPadding) + barHeight / 2)
    .attr("dy", "0.35em") // vertical alignment
    .text(d => d.count);
};
