d3.csv("data/BrandTV.csv", d => {
  return {
    Brand: d.Brand,
    Count: +d.Count
 }; 
}).then(data => {
  console.log(data);
  console.log(data.length);
  console.log(d3.max(data, d => d.Count));
  console.log(d3.min(data, d => d.Count));
  console.log(d3.extent(data, d => d.Count)); //=> array with min and max
  
  // Sort data by Count in descending order
  data.sort((a, b) => b.Count - a.Count);
  console.log("Sorted data:", data);
  
  // Call the bar chart visualization
  createBarChart(data);
});

// Modularized visualization function
const createBarChart = (data) => {
  console.log("Creating bar chart with data:", data);
};

