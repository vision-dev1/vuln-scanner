// DOM Elements
const urlInput = document.getElementById('urlInput');
const scanButton = document.getElementById('scanButton');
const permissionCheckbox = document.getElementById('permissionCheckbox');
const advancedCheckbox = document.getElementById('advancedCheckbox');
const progressSection = document.querySelector('.progress-section');
const resultsSection = document.getElementById('resultsSection');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const resultsContainer = document.getElementById('resultsContainer');

// Event Listeners
scanButton.addEventListener('click', initiateScan);
urlInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        initiateScan();
    }
});

// Function to initiate the scan
function initiateScan() {
    const url = urlInput.value.trim();
    const hasPermission = permissionCheckbox.checked;
    const advancedModules = advancedCheckbox.checked;
    
    // Validate input
    if (!url) {
        alert('Please enter a website URL');
        return;
    }
    
    // Check permission
    if (!hasPermission) {
        alert('Please confirm you have permission to scan this website');
        return;
    }
    
    // Show confirmation for advanced modules
    if (advancedModules) {
        const confirmAdvanced = confirm('Advanced modules (nmap/ZAP) require additional system permissions. Do you want to proceed?');
        if (!confirmAdvanced) {
            return;
        }
    }
    
    // Start scan
    startScan(url, advancedModules);
}

// Function to start the scan process
function startScan(url, advancedModules) {
    // Hide results section and show progress
    resultsSection.classList.add('hidden');
    progressSection.classList.remove('hidden');
    
    // Disable scan button and input
    scanButton.disabled = true;
    urlInput.disabled = true;
    permissionCheckbox.disabled = true;
    advancedCheckbox.disabled = true;
    
    // Reset progress
    updateProgress(0, 'Initializing scan...');
    
    // Simulate progress updates
    simulateProgress();
    
    // Send scan request to backend
    fetch('http://localhost:8081/scan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: url,
            advanced: advancedModules
        })
    })
    .then(response => response.json())
    .then(data => {
        // Complete progress
        updateProgress(100, 'Scan complete');
        
        // Display results
        setTimeout(() => {
            displayResults(data);
            progressSection.classList.add('hidden');
            resultsSection.classList.remove('hidden');
            
            // Re-enable controls
            scanButton.disabled = false;
            urlInput.disabled = false;
            permissionCheckbox.disabled = false;
            advancedCheckbox.disabled = false;
        }, 500);
    })
    .catch(error => {
        console.error('Error:', error);
        updateProgress(0, 'Scan failed: ' + error.message);
        
        // Re-enable controls
        scanButton.disabled = false;
        urlInput.disabled = false;
        permissionCheckbox.disabled = false;
        advancedCheckbox.disabled = false;
    });
}

// Function to simulate progress updates
function simulateProgress() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 5) + 1;
        if (progress >= 90) {
            progress = 90;
            clearInterval(interval);
        }
        updateProgress(progress, `Scanning — ${progress}%`);
    }, 300);
}

// Function to update progress bar
function updateProgress(percentage, text) {
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = text;
}

// Function to display scan results
function displayResults(data) {
    resultsContainer.innerHTML = '';
    
    // Add timestamp
    const timestamp = document.createElement('div');
    timestamp.className = 'result-card';
    timestamp.innerHTML = `
        <div class="result-card-header">
            <h3 class="result-card-title">Scan Information</h3>
        </div>
        <p class="result-card-message">URL: ${data.url}</p>
        <p class="result-card-message">Timestamp: ${new Date(data.timestamp).toLocaleString()}</p>
    `;
    resultsContainer.appendChild(timestamp);
    
    // Add each check result
    for (const [checkName, checkResult] of Object.entries(data.checks)) {
        const card = document.createElement('div');
        card.className = 'result-card';
        
        // Determine status class
        let statusClass = 'status-info';
        if (checkResult.status === 'good' || checkResult.status === 'secure' || checkResult.status === 'valid') {
            statusClass = 'status-good';
        } else if (checkResult.status === 'warning' || checkResult.status === 'expiring_soon') {
            statusClass = 'status-warning';
        } else if (checkResult.status === 'error') {
            statusClass = 'status-error';
        } else if (checkResult.status === 'vulnerable' || checkResult.status === 'insecure' || checkResult.status === 'expired') {
            statusClass = 'status-vulnerable';
        }
        
        card.innerHTML = `
            <div class="result-card-header">
                <h3 class="result-card-title">${checkName}</h3>
                <div class="status-indicator ${statusClass}"></div>
            </div>
            <p class="result-card-message">${checkResult.message}</p>
        `;
        
        // Add details if available
        if (checkResult.details) {
            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'result-card-details';
            
            if (Array.isArray(checkResult.details)) {
                const ul = document.createElement('ul');
                checkResult.details.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    ul.appendChild(li);
                });
                detailsDiv.appendChild(ul);
            } else if (typeof checkResult.details === 'object') {
                const ul = document.createElement('ul');
                for (const [key, value] of Object.entries(checkResult.details)) {
                    const li = document.createElement('li');
                    li.innerHTML = `<strong>${key}:</strong> ${value}`;
                    ul.appendChild(li);
                }
                detailsDiv.appendChild(ul);
            } else {
                detailsDiv.textContent = checkResult.details;
            }
            
            card.appendChild(detailsDiv);
        }
        
        resultsContainer.appendChild(card);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Focus on URL input
    urlInput.focus();
});