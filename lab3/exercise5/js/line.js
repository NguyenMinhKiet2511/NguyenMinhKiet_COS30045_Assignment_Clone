// Line Chart: Spot Power Prices from 1998 to 2024

d3.csv('data/Ex5_ARE_Spot_Prices.csv').then(data => {
    console.log('data loaded:', data);
    
    // Parse data with proper error handling
    data.forEach(d => {
        d.Year = +d.Year;
        
        // Handle column names with or without line breaks
        const avgCol = Object.keys(d).find(key => key.includes('Average Price'));
        d.avgPrice = avgCol ? +d[avgCol] : NaN;
        console.log('Parsed row:', { year: d.Year, avgPrice: d.avgPrice });
    });
    
    if (data.length === 0) {
        throw new Error('No valid data points found');
    }

    // Set dimensions
    const container = document.getElementById('line-chart');
    const width = container.clientWidth - 40;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 60, left: 70 };

    // Create SVG
    const svg = d3.select('#line-chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Create scales
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.Year))
        .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.avgPrice) * 1.1])
        .range([height - margin.bottom, margin.top]);

    // Define line generator for average price
    const lineAverage = d3.line()
        .x(d => xScale(d.Year))
        .y(d => yScale(d.avgPrice));

    // Create axes
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));
    const yAxis = d3.axisLeft(yScale);

    // Add X axis
    svg.append('g')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .attr('class', 'axis')
        .call(xAxis)
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .attr('text-anchor', 'end');

    // Add Y axis
    svg.append('g')
        .attr('transform', `translate(${margin.left}, 0)`)
        .attr('class', 'axis')
        .call(yAxis);

    // Add X axis label
    svg.append('text')
        .attr('class', 'axis-label')
        .attr('x', width / 2)
        .attr('y', height)
        .attr('text-anchor', 'middle')
        .text('Year');

    // Add Y axis label
    svg.append('text')
        .attr('class', 'axis-label')
        .attr('transform', 'rotate(-90)')
        .attr('y', 15)
        .attr('x', -(height / 2))
        .attr('text-anchor', 'middle')
        .text('Spot Price ($ per MWh)');

    // Add average price line (highlighted)
    svg.append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('d', lineAverage)
        .attr('stroke', '#e74c3c')
        .attr('stroke-width', 3)

    // Add legend
    const legend = svg.selectAll('.legend')
        .data(['Average Price ($ per MWh)'])
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(${width - 200}, ${margin.top})`);

    legend.append('line')
        .attr('x1', 0)
        .attr('x2', 15)
        .attr('y1', 7)
        .attr('y2', 7)
        .attr('stroke', '#e74c3c')
        .attr('stroke-width', 3);

    legend.append('text')
        .attr('class', 'legend-label')
        .attr('x', 20)
        .attr('y', 11)
        .text('Average Price ($ per MWh)');

}).catch(error => {
    console.error('Error loading line data:', error);
    document.getElementById('line-chart').innerHTML = '<div class="error">Error loading data: ' + error.message + '</div>';
});


