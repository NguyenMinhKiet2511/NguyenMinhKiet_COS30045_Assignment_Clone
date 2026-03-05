// Donut Chart: Energy Consumption by Screen Technology (All TVs)

d3.csv('data/Ex5_TV_energy_Allsizes_byScreenType.csv').then(data => {
    // Parse data
    data.forEach(d => {
        d['Mean(Labelled energy consumption (kWh/year))'] = 
            +d['Mean(Labelled energy consumption (kWh/year))'];
    });

    // Set dimensions
    const container = document.getElementById('donut-chart');
    const size = Math.min(container.clientWidth, 400);
    const radius = size / 2 - 50;
    const margin = 50;

    // Create SVG
    const svg = d3.select('#donut-chart')
        .append('svg')
        .attr('width', size)
        .attr('height', size)
        .append('g')
        .attr('transform', `translate(${size / 2}, ${size / 2})`);

    // Create pie layout
    const pie = d3.pie()
        .value(d => d['Mean(Labelled energy consumption (kWh/year))']);

    const arc = d3.arc()
        .innerRadius(radius * 0.4)
        .outerRadius(radius);

    // Color scale
    const colorScale = d3.scaleOrdinal(d3.schemeSet2)
        .domain(data.map(d => d.Screen_Tech));

    // Create slices
    const slices = svg.selectAll('.slice')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'slice');

    slices.append('path')
        .attr('d', arc)
        .attr('fill', (d, i) => colorScale(data[i].Screen_Tech))
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        

    // Add labels with energy values
    slices.append('text')
        .attr('class', 'slice-label')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .attr('fill', 'white')
        .attr('font-weight', 'bold')
        .text((d, i) => {
            const value = data[i]['Mean(Labelled energy consumption (kWh/year))'];
            return value.toFixed(0) + ' kWh';
        });

    // Add legend
    const legend = svg.selectAll('.legend')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', (d, i) => `translate(${-radius - 40}, ${-radius + i * 25})`);

    legend.append('rect')
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', d => colorScale(d.Screen_Tech));

    legend.append('text')
        .attr('class', 'legend-label')
        .attr('x', 20)
        .attr('y', 12)
        .text(d => `${d.Screen_Tech} `);

}).catch(error => {
    console.error('Error loading donut data:', error);
    document.getElementById('donut-chart').innerHTML = '<div class="error">Error loading data</div>';
});

