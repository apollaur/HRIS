// Booking Page Charts
function initBookingCharts() {
    const sectors = ['GASS', 'RESEARCH', 'DEVELOPMENT', 'UNIT/OFFICE/BRANCH', 'RCEF'];

    // Tickets by Sector - Horizontal Bar
    const ticketsCtx = document.getElementById('bookingTicketsChart');
    if (ticketsCtx) {
        new Chart(ticketsCtx.getContext('2d'), {
            type: 'bar',
            indexAxis: 'y',
            data: {
                labels: sectors,
                datasets: [{
                    label: 'Tickets',
                    data: [29, 165, 65, 11, 10],
                    backgroundColor: '#B8E0D2',
                    borderWidth: 0,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Tickets by Sector',
                        font: { size: 13, weight: '700' },
                        color: '#1F2937',
                        padding: { bottom: 12 }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: { stepSize: 20 },
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    },
                    y: {
                        grid: { display: false },
                        ticks: { font: { size: 10 } }
                    }
                }
            }
        });
    }

    // Cost by Sector - Horizontal Bar
    const costCtx = document.getElementById('bookingCostChart');
    if (costCtx) {
        new Chart(costCtx.getContext('2d'), {
            type: 'bar',
            indexAxis: 'y',
            data: {
                labels: sectors,
                datasets: [{
                    label: 'Cost (₱)',
                    data: [551412, 4941477, 1439968, 188016, 309091],
                    backgroundColor: '#AEC6CF',
                    borderWidth: 0,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Cost by Sector',
                        font: { size: 13, weight: '700' },
                        color: '#1F2937',
                        padding: { bottom: 12 }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return '₱' + context.parsed.x.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '₱' + (value / 1000000).toFixed(1) + 'M';
                            },
                            grid: { color: 'rgba(0,0,0,0.05)' }
                        }
                    },
                    y: {
                        grid: { display: false },
                        ticks: { font: { size: 10 } }
                    }
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', initBookingCharts);
