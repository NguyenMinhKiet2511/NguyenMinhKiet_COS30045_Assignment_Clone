// Scatter plot chart for Exercise 6
// Plots Energy Consumption by Star Rating for TVs
// Color-coded by Screen Technology with tooltip

let currentScatter = null;

function createScatterPlot(screenTech = 'All') {
    // Get filtered data
    const data = getFilteredData(screenTech);
    
    if (data.length === 0) {
        console.warn('No data available for screen tech:', screenTech);
        return;
    }
    
    console.log('Creating scatter plot for', screenTech, 'with', data.length, 'records');
    
    // Clear previous chart
    d3.select('#scatter').selectAll('*').remove();
    
    // Get dimensions
    const container = document.getElementById('scatter');
    const containerWidth = container.clientWidth;
    const width = Math.min(containerWidth - 40, CHART_DIMENSIONS.width);
    const height = CHART_DIMENSIONS.height;
    const margin = CHART_DIMENSIONS.margin;
    
    // Create scales
    const xScale = d3.scaleLinear()
        .domain([0, 5.5])
        .range([margin.left, width - margin.right]);
    
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.energyConsumption) + 50])
        .range([height - margin.bottom, margin.top]);
    
    // Create color scale for screen technology
    const colorScale = d3.scaleOrdinal()
        .domain(['LED', 'LCD', 'OLED'])
        .range([COLORS.LED, COLORS.LCD, COLORS.OLED]);
    
    // Create SVG
    const svg = d3.select('#scatter')
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    
    // Create tooltip div
    const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0)
        .style('position', 'absolute')
        .style('background-color', 'rgba(0, 0, 0, 0.8)')
        .style('color', 'white')
        .style('padding', '8px 12px')
        .style('border-radius', '4px')
        .style('font-size', '12px')
        .style('pointer-events', 'none')
        .style('z-index', '1000');
    
    // Add scatter points
    svg.selectAll('.scatter-point')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'scatter-point')
        .attr('cx', d => xScale(d.star))
        .attr('cy', d => yScale(d.energyConsumption))
        .attr('r', 5)
        .attr('fill', d => colorScale(d.screenTech))
        .attr('opacity', 0.7)
        .attr('stroke', '#333')
        .attr('stroke-width', 0.5)
        .on('mouseover', function(event, d) {
            d3.select(this)
                .transition()
                .duration(200)
                .attr('r', 8)
                .attr('opacity', 1)
                .attr('stroke-width', 2);
            
            // Show tooltip
            tooltip
                .style('opacity', 0.95)
                .html(`
                    <strong>Brand:</strong> ${d.brand}<br/>
                    <strong>Star Rating:</strong> ${d.star}<br/>
                    <strong>Energy Consumption:</strong> ${d.energyConsumption} kWh/year<br/>
                    <strong>Screen Size:</strong> ${d.screenSize}"<br/>
                    <strong>Technology:</strong> ${d.screenTech}
                `)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', function() {
            d3.select(this)
                .transition()
                .duration(200)
                .attr('r', 5)
                .attr('opacity', 0.7)
                .attr('stroke-width', 0.5);
            
            tooltip.style('opacity', 0);
        });
    
    // Create axes
    const xAxis = d3.axisBottom(xScale).ticks(5);
    const yAxis = d3.axisLeft(yScale).ticks(8);
    
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
        .text('Star Rating');
    
    // Add Y axis label
    svg.append('text')
        .attr('class', 'axis-label')
        .attr('transform', 'rotate(-90)')
        .attr('y', 15)
        .attr('x', -(height / 2))
        .attr('text-anchor', 'middle')
        .text('Energy Consumption (kWh/year)');
    
    // Add chart title
    svg.append('text')
        .attr('class', 'chart-title')
        .attr('x', width / 2)
        .attr('y', 25)
        .attr('text-anchor', 'middle')
        .text('TV Energy Consumption by Star Rating' + (screenTech !== 'All' ? ` (${screenTech})` : ''));
    
    // Add legend for screen technologies
    const legendX = width - 200;
    const legendY = margin.top + 10;
    
    // Legend background
    svg.append('rect')
        .attr('x', legendX - 15)
        .attr('y', legendY - 25)
        .attr('width', 180)
        .attr('height', 110)
        .attr('fill', 'white')
        .attr('stroke', '#ccc')
        .attr('stroke-width', 1);
    
    // Legend title
    svg.append('text')
        .attr('x', legendX)
        .attr('y', legendY)
        .attr('font-weight', 'bold')
        .attr('font-size', '12px')
        .text('Screen Technology');
    
    // Legend entries
    const legendEntries = ['LED', 'LCD', 'OLED'];
    const legendItemHeight = 25;
    
    legendEntries.forEach((tech, i) => {
        const legendItemY = legendY + 20 + (i * legendItemHeight);
        
        // Color box
        svg.append('rect')
            .attr('x', legendX)
            .attr('y', legendItemY)
            .attr('width', 12)
            .attr('height', 12)
            .attr('fill', colorScale(tech));
        
        // Label
        svg.append('text')
            .attr('x', legendX + 18)
            .attr('y', legendItemY + 10)
            .attr('font-size', '11px')
            .text(tech + ' (' + data.filter(d => d.screenTech === tech).length + ')');
    });
    
    // Store reference for potential future updates
    currentScatter = { svg, data, xScale, yScale, colorScale };
}
