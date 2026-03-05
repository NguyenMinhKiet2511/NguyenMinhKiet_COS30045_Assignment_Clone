// Scatter Plot: Energy Consumption vs Star Rating

d3.csv('data/Ex5_TV_energy.csv').then(data => {
    // Parse data
    data.forEach(d => {
        d.energy_consumpt = +d.energy_consumpt;
        d.star2 = +d.star2;
    });

    // Set dimensions
    const container = document.getElementById('scatter-chart');
    const width = container.clientWidth - 40;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 60, left: 70 };

    // Create SVG
    const svg = d3.select('#scatter-chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Create scales
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.star2) + 0.5])
        .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.energy_consumpt) + 20])
        .range([height - margin.bottom, margin.top]);

    const colorScale = d3.scaleOrdinal(d3.schemeSet2)
        .domain([...new Set(data.map(d => d.screen_tech))]);

    // Create axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Add X axis
    svg.append('g')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .attr('class', 'axis')
        .call(xAxis);

    // Add Y axis
    svg.append('g')
        .attr('transform', `translate(${margin.left}, 0)`)
        .attr('class', 'axis')
        .call(yAxis);

    // Add X axis label
    svg.append('text')
        .attr('class', 'axis-label')
        .attr('x', width / 2)
        .attr('y', height - 10)
        .attr('text-anchor', 'middle')
        .text('Star Rating');

    // Add Y axis label
    svg.append('text')
        .attr('class', 'axis-label')
        .attr('transform', 'rotate(-90)')
        .attr('y', 15)
        .attr('x', -(height / 2))
        .attr('text-anchor', 'middle')
        .text('Energy Consumption (kWh/year)');

    // Add data points
    svg.selectAll('.dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', d => xScale(d.star2))
        .attr('cy', d => yScale(d.energy_consumpt))
        .attr('r', 5)
        .attr('fill', 'steelblue')

    // Add legend
    const legend = svg.selectAll('.legend')
        .data(colorScale.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', (d, i) => `translate(${width - 180}, ${margin.top + i * 20})`);



}).catch(error => {
    console.error('Error loading scatter data:', error);
    document.getElementById('scatter-chart').innerHTML = '<div class="error">Error loading data</div>';
});

