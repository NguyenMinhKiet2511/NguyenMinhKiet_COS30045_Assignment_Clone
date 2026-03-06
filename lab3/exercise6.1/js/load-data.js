// Load and parse data for Exercise 6

let rawData = [];

function loadData() {
    return d3.csv(DATA_FILE).then(data => {
        // Parse numeric values
        data.forEach(d => {
            d.energyConsumption = +d.energyConsumption;
            d.star = +d.star;
            d.screenSize = +d.screenSize;
        });
        
        rawData = data;
        console.log('Data loaded successfully:', data.length, 'records');
        console.log('Screen technologies:', [...new Set(data.map(d => d.screenTech))]);
        
        return data;
    }).catch(error => {
        console.error('Error loading data:', error);
        throw error;
    });
}

function getFilteredData(screenTech = null) {
    if (!screenTech || screenTech === 'All') {
        return rawData;
    }
    return rawData.filter(d => d.screenTech === screenTech);
}

function getScreenTechs() {
    return ['All', ...new Set(rawData.map(d => d.screenTech))];
}
