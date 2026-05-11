// COS Page Charts
function initCOSCharts() {
    // Sex Distribution by Sector - Horizontal Grouped Bar Chart
    const sexCtx = document.getElementById('sexDistributionChart');
    if (sexCtx) {
        new Chart(sexCtx.getContext('2d'), {
            type: 'bar',
            indexAxis: 'y',
            data: {
                labels: ['GASS', 'RESEARCH', 'DEVELOPMENT', 'UNIT/OFFICE', 'RCEF'],
                datasets: [
                    {
                        label: 'Male',
                        data: [110, 243, 52, 9, 24],
                        backgroundColor: '#C6E3E1',
                        borderWidth: 1,
                        borderRadius: 4
                    },
                    {
                        label: 'Female',
                        data: [84, 146, 37, 9, 29],
                        backgroundColor: '#DDBDC2',
                        borderWidth: 1,
                        borderRadius: 4
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
                            padding: 12,
                            usePointStyle: true,
                            pointStyle: 'rectRounded'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Sex Distribution by Sector',
                        font: { size: 13, weight: '700' },
                        color: '#1F2937',
                        padding: { bottom: 12 }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const pct = ((context.parsed.x / total) * 100).toFixed(1);
                                return `${context.dataset.label}: ${context.parsed.x} (${pct}%)`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { stepSize: 50 },
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    }

    // Age Group Distribution by Sector - Stacked Bar Chart
    const ageCtx = document.getElementById('ageGroupChart');
    if (ageCtx) {
        new Chart(ageCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['GASS', 'RESEARCH', 'DEVELOPMENT', 'UNIT/OFFICE', 'RCEF'],
                datasets: [
                    {
                        label: '21-24',
                        data: [10, 17, 6, 1, 3],
                        backgroundColor: '#B8E0D2',
                        borderWidth: 0,
                        borderRadius: 2
                    },
                    {
                        label: '25-34',
                        data: [98, 179, 54, 15, 48],
                        backgroundColor: '#AEC6CF',
                        borderWidth: 0,
                        borderRadius: 2
                    },
                    {
                        label: '35-44',
                        data: [44, 85, 19, 1, 2],
                        backgroundColor: '#F5D0A9',
                        borderWidth: 0,
                        borderRadius: 2
                    },
                    {
                        label: '45-54',
                        data: [31, 54, 8, 1, 0],
                        backgroundColor: '#F0B8C4',
                        borderWidth: 0,
                        borderRadius: 2
                    },
                    {
                        label: '55-64',
                        data: [17, 33, 2, 0, 0],
                        backgroundColor: '#D8C3E3',
                        borderWidth: 0,
                        borderRadius: 2
                    },
                    {
                        label: '65+',
                        data: [1, 10, 0, 0, 0],
                        backgroundColor: '#C6E3E1',
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
                            font: { size: 10 },
                            padding: 8,
                            usePointStyle: true,
                            pointStyle: 'rectRounded'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Age Group Distribution by Sector',
                        font: { size: 13, weight: '700' },
                        color: '#1F2937',
                        padding: { bottom: 12 }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        grid: { display: false }
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        ticks: { stepSize: 50 },
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    }
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', initCOSCharts);
