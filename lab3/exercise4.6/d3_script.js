
// Define margins and dimensions
const margin = { top: 20, right: 30, bottom: 60, left: 100 };
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// Create SVG with responsive viewBox
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", `0 0 850 400`)
  .style("border", "1px solid black")
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

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

// Create bar chart with D3 scales
const createBarChart = (data) => {
  console.log("Creating bar chart with scales...");
  
  // STEP 1: Add linear scale for count data (X-axis)
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([0, width]);
  
  // STEP 2: Add band scale for category data (Y-axis)
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, height])
    .padding(0.1); // Add padding between bars
  
  console.log("xScale domain:", xScale.domain());
  console.log("xScale range:", xScale.range());
  console.log("yScale domain:", yScale.domain());
  console.log("yScale range:", yScale.range());
  console.log("yScale bandwidth:", yScale.bandwidth());
  
  // Bind data to rectangles and create bars
  svg.selectAll("rect.bar")
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .attr("x", 0)
    .attr("y", d => yScale(d.brand))
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth());
  
  // Add X-axis (linear scale)
  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale))
    .attr("class", "axis");
  
  // Add Y-axis (band scale)
  svg.append("g")
    .call(d3.axisLeft(yScale))
    .attr("class", "axis");
  
  // Add X-axis label
  svg.append("text")
    .attr("class", "axis-label")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom - 10)
    .style("text-anchor", "middle")
    .text("TV Count");
  
  // Add Y-axis label
  svg.append("text")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Brand");
  
  // Add value labels above bars
  svg.selectAll("text.value-label")
    .data(data)
    .join("text")
    .attr("class", "value-label")
    .attr("x", d => xScale(d.count) + 5)
    .attr("y", d => yScale(d.brand) + yScale.bandwidth() / 2)
    .attr("dy", "0.35em")
    .text(d => d.count);
};
