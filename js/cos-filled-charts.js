// COS Filled Page Charts
function initCOSFilledCharts() {
    const ctx = document.getElementById('filledCountChart');
    if (!ctx) return;

    const stations = ['CES', 'AGUSAN', 'BATAC', 'BICOL', 'CMU', 'ISABELA', 'LOS BAÑOS', 'MIDSAYAP', 'NEGROS', 'SAMAR'];

    new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stations,
            datasets: [
                {
                    label: 'CORPO',
                    data: [395, 49, 44, 43, 0, 36, 86, 53, 45, 1],
                    backgroundColor: '#B8E0D2',
                    borderWidth: 0,
                    borderRadius: 2
                },
                {
                    label: 'TRUST',
                    data: [117, 2, 1, 4, 0, 3, 0, 4, 4, 0],
                    backgroundColor: '#AEC6CF',
                    borderWidth: 0,
                    borderRadius: 2
                },
                {
                    label: 'BDD',
                    data: [38, 23, 9, 5, 0, 19, 22, 38, 31, 17],
                    backgroundColor: '#F5D0A9',
                    borderWidth: 0,
                    borderRadius: 2
                },
                {
                    label: 'RCEF',
                    data: [163, 46, 27, 1, 0, 41, 31, 37, 58, 0],
                    backgroundColor: '#F0B8C4',
                    borderWidth: 0,
                    borderRadius: 2
                },
                {
                    label: 'NRP',
                    data: [0, 0, 0, 0, 0, 0, 11, 0, 0, 0],
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
                    text: 'Filled Count by Fund Class and Station',
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

document.addEventListener('DOMContentLoaded', initCOSFilledCharts);
