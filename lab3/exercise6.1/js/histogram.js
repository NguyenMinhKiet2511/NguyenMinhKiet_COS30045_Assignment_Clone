// Histogram chart for Exercise 6

let currentHistogram = null;

function createHistogram(screenTech = 'All') {
    // Get filtered data
    const data = getFilteredData(screenTech);
    
    if (data.length === 0) {
        console.warn('No data available for screen tech:', screenTech);
        return;
    }
    
    console.log('Creating histogram for', screenTech, 'with', data.length, 'records');
    
    // Clear previous chart
    d3.select('#histogram').selectAll('*').remove();
    
    // Get dimensions
    const container = document.getElementById('histogram');
    const containerWidth = container.clientWidth;
    const width = Math.min(containerWidth - 40, CHART_DIMENSIONS.width);
    const height = CHART_DIMENSIONS.height;
    const margin = CHART_DIMENSIONS.margin;
    
    // Create scales
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.energyConsumption) + 50])
        .range([margin.left, width - margin.right]);
    
    // Create histogram bins
    const histogram = d3.histogram()
        .domain(xScale.domain())
        .thresholds(xScale.ticks(15));
    
    const bins = histogram(data.map(d => d.energyConsumption));
    
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(bins, d => d.length)])
        .range([height - margin.bottom, margin.top]);
    
    // Create SVG
    const svg = d3.select('#histogram')
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    
    // Get bar color based on screen tech
    const barColor = screenTech === 'All' ? '#9b59b6' : COLORS[screenTech] || '#95a5a6';
    
    // Add bars
    svg.selectAll('.bar')
        .data(bins)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(d.x0))
        .attr('y', d => yScale(d.length))
        .attr('width', d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 1))
        .attr('height', d => height - margin.bottom - yScale(d.length))
        .attr('fill', barColor)
        .attr('opacity', 0.8)
        .on('mouseover', function(event, d) {
            d3.select(this)
                .transition()
                .duration(200)
                .attr('opacity', 1)
                .attr('stroke', '#333')
                .attr('stroke-width', 2);
            
            // Show tooltip
            svg.append('text')
                .attr('class', 'tooltip-text')
                .attr('x', xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) / 2)
                .attr('y', yScale(d.length) - 10)
                .attr('text-anchor', 'middle')
                .attr('font-size', '12px')
                .attr('font-weight', 'bold')
                .attr('fill', '#333')
                .text('Count: ' + d.length);
        })
        .on('mouseout', function() {
            d3.select(this)
                .transition()
                .duration(200)
                .attr('opacity', 0.8)
                .attr('stroke', 'none');
            
            svg.selectAll('.tooltip-text').remove();
        });
    
    // Create axes
    const xAxis = d3.axisBottom(xScale).ticks(10);
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
        .attr('y', height - 5)
        .attr('text-anchor', 'middle')
        .text('Energy Consumption (kWh/year)');
    
    // Add Y axis label
    svg.append('text')
        .attr('class', 'axis-label')
        .attr('transform', 'rotate(-90)')
        .attr('y', 15)
        .attr('x', -(height / 2))
        .attr('text-anchor', 'middle')
        .text('Frequency');
    
    // Add chart title
    svg.append('text')
        .attr('class', 'chart-title')
        .attr('x', width / 2)
        .attr('y', 25)
        .attr('text-anchor', 'middle')
        .text('Distribution of TV Energy Consumption' + (screenTech !== 'All' ? ` (${screenTech})` : ''));
    
    // Add legend
    const legendX = width - 150;
    const legendY = margin.top + 10;
    
    svg.append('rect')
        .attr('x', legendX - 10)
        .attr('y', legendY - 20)
        .attr('width', 140)
        .attr('height', 40)
        .attr('fill', 'white')
        .attr('stroke', '#ccc')
        .attr('stroke-width', 1);
    
    svg.append('rect')
        .attr('x', legendX)
        .attr('y', legendY)
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', barColor);
    
    svg.append('text')
        .attr('class', 'legend-label')
        .attr('x', legendX + 20)
        .attr('y', legendY + 12)
        .text(screenTech + ' TVs');
    
    currentHistogram = screenTech;
}

function updateHistogram(screenTech) {
    console.log('Updating histogram to:', screenTech);
    createHistogram(screenTech);
}
