// COS Vacant Page Charts
function initCOSVacantCharts() {
    const ctx = document.getElementById('vacantCountChart');
    if (!ctx) return;

    const stations = ['CES', 'AGUSAN', 'BATAC', 'BICOL', 'CMU', 'ISABELA', 'LOS BAÑOS', 'MIDSAYAP', 'NEGROS', 'SAMAR'];

    new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stations,
            datasets: [
                {
                    label: 'CORPO',
                    data: [271, 42, 42, 46, 3, 39, 67, 37, 54, 1],
                    backgroundColor: '#B8E0D2',
                    borderWidth: 0,
                    borderRadius: 2
                },
                {
                    label: 'TRUST',
                    data: [114, 1, 2, 5, 1, 2, 0, 4, 1, 0],
                    backgroundColor: '#AEC6CF',
                    borderWidth: 0,
                    borderRadius: 2
                },
                {
                    label: 'BDD',
                    data: [42, 22, 5, 3, 25, 21, 0, 12, 32, 1],
                    backgroundColor: '#F5D0A9',
                    borderWidth: 0,
                    borderRadius: 2
                },
                {
                    label: 'RCEF',
                    data: [172, 56, 35, 61, 2, 47, 52, 47, 63, 0],
                    backgroundColor: '#F0B8C4',
                    borderWidth: 0,
                    borderRadius: 2
                },
                {
                    label: 'NRP',
                    data: [0, 9, 0, 0, 0, 0, 19, 10, 0, 0],
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
                    text: 'Vacant Count by Fund Class and Station',
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
                    ticks: { stepSize: 100 },
                    grid: { color: 'rgba(0,0,0,0.05)' }
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', initCOSVacantCharts);
