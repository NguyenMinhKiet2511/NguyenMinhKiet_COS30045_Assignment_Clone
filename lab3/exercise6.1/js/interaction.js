// Interactive controls for Exercise 6

function initializeFilters() {
    const screenTechs = getScreenTechs();
    const filterContainer = document.getElementById('filter-controls');
    
    // Clear existing filters
    filterContainer.innerHTML = '';
    
    // Create filter label
    const label = document.createElement('label');
    label.className = 'filter-label';
    label.textContent = 'Filter by Screen Technology:';
    filterContainer.appendChild(label);
    
    // Create button container
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'filter-buttons';
    
    // Create buttons for each screen technology
    screenTechs.forEach(tech => {
        const button = document.createElement('button');
        button.className = 'filter-button';
        button.textContent = tech;
        button.value = tech;
        
        // Set "All" button as active by default
        if (tech === 'All') {
            button.classList.add('active');
        }
        
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            document.querySelectorAll('.filter-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            button.classList.add('active');
            
            console.log('Filter changed to:', tech);
            updateHistogram(tech);
        });
        
        buttonContainer.appendChild(button);
    });
    
    filterContainer.appendChild(buttonContainer);
}

// Update histogram only (scatter plot is not affected by filter)
function updateHistogram(screenTech) {
    console.log('Updating histogram for:', screenTech);
    createHistogram(screenTech);
}

function handleWindowResize() {
    if (currentHistogram !== null) {
        createHistogram(currentHistogram);
    }
}

// Add resize event listener
window.addEventListener('resize', handleWindowResize);
