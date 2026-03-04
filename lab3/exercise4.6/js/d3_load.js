// Define SVG dimensions and constants
const svgWidth = 700;
const svgHeight = 400;
const labelWidth = 90;
const valueWidth = 50;
const margin = { top: 20, right: 20, bottom: 20, left: 20 };

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

// Create and draw bar chart with D3 scales
const createBarChart = (data) => {
  console.log("Creating bar chart with data:", data);
  
  // Calculate available dimensions
  const chartWidth = svgWidth - labelWidth - valueWidth - margin.left - margin.right;
  const chartHeight = svgHeight - margin.top - margin.bottom;
  
  // 1. LINEAR SCALE for count data (x-axis for bar widths)
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([0, chartWidth]);
  
  // 2. BAND SCALE for category data (y-axis for bar positions)
  // .padding() method adds padding between bands
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, chartHeight])
    .padding(0.2); // 3. ADD PADDING - 20% padding between bars
  
  console.log("X Scale domain:", xScale.domain());
  console.log("Y Scale domain:", yScale.domain());
  console.log("Band width:", yScale.bandwidth());
  
  // Bind data to rectangles using scales
  svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => `bar bar-${d.count}`)
    .attr("x", labelWidth + 10) // left position constant
    .attr("y", (d) => margin.top + yScale(d.brand)) // use band scale for y
    .attr("width", d => xScale(d.count)) // use linear scale for width
    .attr("height", yScale.bandwidth()); // use band scale for height
  
  // Add brand labels on the left
  svg.selectAll("text.label")
    .data(data)
    .join("text")
    .attr("class", "label")
    .attr("x", labelWidth)
    .attr("y", (d) => margin.top + yScale(d.brand) + yScale.bandwidth() / 2)
    .attr("dy", "0.35em") // vertical alignment
    .text(d => d.brand);
  
  // Add count values on the right
  svg.selectAll("text.value")
    .data(data)
    .join("text")
    .attr("class", "value")
    .attr("x", (d) => labelWidth + 10 + xScale(d.count) + 5) // positioned after bar
    .attr("y", (d) => margin.top + yScale(d.brand) + yScale.bandwidth() / 2)
    .attr("dy", "0.35em") // vertical alignment
    .text(d => d.count);
};
