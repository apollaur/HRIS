async function initDashboard() {
    try {
        const response = await fetch('data/dashboard-data.json');
        const data = await response.json();

        // 1. Fill the Filled/Vacant Tables & Calculate Personnel Totals
        const filledBody = document.getElementById('filled-table-body');
        const vacantBody = document.getElementById('vacant-table-body');
        
        let totalFilled = 0, totalVacant = 0;

        data.personnel.forEach(item => {
            filledBody.innerHTML += `<tr><td>${item.station}</td><td>${item.filled}</td></tr>`;
            vacantBody.innerHTML += `<tr><td>${item.station}</td><td>${item.vacant}</td></tr>`;
            totalFilled += item.filled;
            totalVacant += item.vacant;
        });

        filledBody.innerHTML += `<tr class="totalhired"><td>TOTAL</td><td>${totalFilled.toLocaleString()}</td></tr>`;
        vacantBody.innerHTML += `<tr class="totalhired"><td>TOTAL</td><td>${totalVacant.toLocaleString()}</td></tr>`;

        // 2. Helper function for the Male/Female Tables & JO Calculation
        let totalJO = 0;

        function buildGenderTable(tbodyId, dataArray, isJO = false) {
            const tbody = document.getElementById(tbodyId);
            let totalM = 0, totalF = 0;

            dataArray.forEach(item => {
                const rowTotal = item.m + item.f;
                tbody.innerHTML += `
                    <tr>
                        <td>${item.station}</td>
                        <td>${item.m}</td>
                        <td>${item.f}</td>
                        <td class="bold-cell">${rowTotal}</td>
                    </tr>`;
                totalM += item.m;
                totalF += item.f;
                
                // If this is the JO table, keep track for the KPI card
                if (isJO) totalJO += rowTotal;
            });

            tbody.innerHTML += `
                <tr class="total-row">
                    <td>TOTAL</td>
                    <td>${totalM}</td>
                    <td>${totalF}</td>
                    <td>${(totalM + totalF).toLocaleString()}</td>
                </tr>`;
        }

        // 3. Build the rest of the tables
        buildGenderTable('cos-body', data.cos);
        buildGenderTable('jo-body', data.jo, true); // Added 'true' to trigger JO count
        buildGenderTable('diversity-body', data.diversity);

        // 4. Update the KPI Cards
        // ATH = Hired + Vacant (Excluding JO per your note)
        document.getElementById('kpi-ath').textContent = (totalFilled + totalVacant).toLocaleString();
        document.getElementById('kpi-hired').textContent = totalFilled.toLocaleString();
        document.getElementById('kpi-vacant').textContent = totalVacant.toLocaleString();
        document.getElementById('kpi-jo').textContent = totalJO.toLocaleString();

        // 5. Initialize Charts
        initCharts(data.personnel);

    } catch (error) {
        console.error("Syntax or Path Error:", error);
    }
}

initDashboard();

function initCharts(personnelData) {
    // Prepare data for hired personnel chart
    const hiredLabels = personnelData.map(item => item.station);
    const hiredValues = personnelData.map(item => item.filled);
    const hiredColors = [
        '#B8E0D2', '#AEC6CF', '#F5D0A9', '#F0B8C4', '#D8C3E3',
        '#C6E3E1', '#DDBDC2', '#FAD7B5', '#C7CEEA', '#B5EAD7'
    ];

    // Prepare data for vacant positions chart
    const vacantLabels = personnelData.map(item => item.station);
    const vacantValues = personnelData.map(item => item.vacant);
    const vacantColors = [
        '#F0B8C4', '#F5D0A9', '#AEC6CF', '#D8C3E3', '#B8E0D2',
        '#C6E3E1', '#DDBDC2', '#FAD7B5', '#C7CEEA', '#B5EAD7'
    ];

    // Create hired personnel pie chart
    const hiredCtx = document.getElementById('hiredChart').getContext('2d');
    new Chart(hiredCtx, {
        type: 'pie',
        data: {
            labels: hiredLabels,
            datasets: [{
                data: hiredValues,
                backgroundColor: hiredColors,
                borderColor: 'transparent',
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 11
                        },
                        padding: 10,
                        generateLabels: function(chart) {
                            const data = chart.data;
                            const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                            return data.labels.map((label, i) => {
                                const value = data.datasets[0].data[i];
                                const percentage = ((value / total) * 100).toFixed(1);
                                return {
                                    text: `${label}: ${percentage}%`,
                                    fillStyle: data.datasets[0].backgroundColor[i],
                                    hidden: false,
                                    index: i
                                };
                            });
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            return `${context.label}: ${context.parsed} (${percentage}%)`;
                        }
                    }
                },
                datalabels: {
                    display: false
                }
            }
        }
    });

    // Create vacant positions bar chart
    const vacantCtx = document.getElementById('vacantChart').getContext('2d');
    new Chart(vacantCtx, {
        type: 'bar',
        data: {
            labels: vacantLabels,
            datasets: [{
                label: 'Vacant Positions',
                data: vacantValues,
                backgroundColor: vacantColors,
                borderColor: 'transparent',
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed.y / total) * 100).toFixed(1);
                            return `${context.label}: ${context.parsed.y} (${percentage}%)`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 10
                        }
                    }
                }
            }
        }
    });
}