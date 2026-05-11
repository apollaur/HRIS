// Job Order Page Charts
function initJOCharts() {
    // JO Count by Fund Class and Station
    const countCtx = document.getElementById('joCountChart');
    if (countCtx) {
        const stations = ['CES', 'AGUSAN', 'BATAC', 'BICOL', 'CMU', 'ISABELA', 'LOS BAÑOS', 'MIDSAYAP', 'NEGROS', 'SAMAR'];

        new Chart(countCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: stations,
                datasets: [
                    {
                        label: 'CORPO',
                        data: [125, 0, 4, 8, 2, 5, 0, 0, 0, 0],
                        backgroundColor: '#B8E0D2',
                        borderWidth: 0,
                        borderRadius: 2
                    },
                    {
                        label: 'TRUST',
                        data: [44, 0, 3, 3, 0, 0, 0, 6, 17, 0],
                        backgroundColor: '#AEC6CF',
                        borderWidth: 0,
                        borderRadius: 2
                    },
                    {
                        label: 'BDD',
                        data: [13, 0, 0, 2, 11, 13, 1, 3, 1, 0],
                        backgroundColor: '#F5D0A9',
                        borderWidth: 0,
                        borderRadius: 2
                    },
                    {
                        label: 'RCEF',
                        data: [48, 0, 5, 28, 0, 14, 28, 0, 0, 0],
                        backgroundColor: '#F0B8C4',
                        borderWidth: 0,
                        borderRadius: 2
                    },
                    {
                        label: 'NRP',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        backgroundColor: '#D8C3E3',
                        borderWidth: 0,
                        borderRadius: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: { size: 11 },
                            padding: 10,
                            usePointStyle: true,
                            pointStyle: 'rectRounded'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Job Order Count by Fund Class and Station',
                        font: { size: 13, weight: '700' },
                        color: '#1F2937',
                        padding: { bottom: 12 }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        grid: { display: false },
                        ticks: { font: { size: 10 } }
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        ticks: { stepSize: 20 },
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    }
                }
            }
        });
    }

    // JO Demographics - Male & Female by Sector
    const demoCtx = document.getElementById('joDemographicsChart');
    if (demoCtx) {
        const sectors = ['GASS', 'RESEARCH', "DEV'T", 'OED', 'RCEF'];

        new Chart(demoCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: sectors,
                datasets: [
                    {
                        label: 'Male',
                        data: [69, 131, 12, 2, 86],
                        backgroundColor: '#C6E3E1',
                        borderWidth: 0,
                        borderRadius: 2
                    },
                    {
                        label: 'Female',
                        data: [56, 147, 10, 0, 25],
                        backgroundColor: '#DDBDC2',
                        borderWidth: 0,
                        borderRadius: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: { size: 11 },
                            padding: 10,
                            usePointStyle: true,
                            pointStyle: 'rectRounded'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Male & Female by Sector',
                        font: { size: 13, weight: '700' },
                        color: '#1F2937',
                        padding: { bottom: 12 }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { font: { size: 10 } }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: { stepSize: 20 },
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    }
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', initJOCharts);
