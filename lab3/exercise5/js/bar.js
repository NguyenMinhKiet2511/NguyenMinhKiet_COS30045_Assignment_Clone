// Bar Chart: Energy Consumption by Screen Technology (55-inch TVs)

d3.csv('data/Ex5_TV_energy_55inchtv_byScreenType.csv').then(data => {
    // Parse data
    data.forEach(d => {
        d['Mean(Labelled energy consumption (kWh/year))'] = 
            +d['Mean(Labelled energy consumption (kWh/year))'];
    });

    // Set dimensions
    const container = document.getElementById('bar-chart');
    const width = container.clientWidth - 40;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 60, left: 70 };

    // Create SVG
    const svg = d3.select('#bar-chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Create scales
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.Screen_Tech))
        .range([margin.left, width - margin.right])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d['Mean(Labelled energy consumption (kWh/year))']) * 1.1])
        .range([height - margin.bottom, margin.top]);

    const colorScale = d3.scaleOrdinal(d3.schemeSet2)
        .domain(data.map(d => d.Screen_Tech));

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
        .text('Screen Technology');

    // Add Y axis label
    svg.append('text')
        .attr('class', 'axis-label')
        .attr('transform', 'rotate(-90)')
        .attr('y', 15)
        .attr('x', -(height / 2))
        .attr('text-anchor', 'middle')
        .text('Energy Consumption (kWh/year)');

    // Add bars
    svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(d.Screen_Tech))
        .attr('y', d => yScale(d['Mean(Labelled energy consumption (kWh/year))']))
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - margin.bottom - yScale(d['Mean(Labelled energy consumption (kWh/year))']))
        .attr('fill', d => colorScale(d.Screen_Tech))

    // Add value labels on bars
    svg.selectAll('.bar-label')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'bar-label')
        .attr('x', d => xScale(d.Screen_Tech) + xScale.bandwidth() / 2)
        .attr('y', d => yScale(d['Mean(Labelled energy consumption (kWh/year))']) - 5)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .attr('fill', '#333')
        .text(d => d['Mean(Labelled energy consumption (kWh/year))'].toFixed(1));

}).catch(error => {
    console.error('Error loading bar data:', error);
    document.getElementById('bar-chart').innerHTML = '<div class="error">Error loading data</div>';
});

