
function exportToPDF() {
    const element = document.querySelector('.main-content');
    const opt = {
        margin: 0.5,
        filename: 'JO-Report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
    };

    // Show loading state
    const exportBtn = document.querySelector('.export-btn');
    const originalText = exportBtn.innerHTML;
    exportBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>GENERATING...</span>';
    exportBtn.disabled = true;

    html2pdf().set(opt).from(element).save().then(() => {
        // Restore button state
        exportBtn.innerHTML = originalText;
        exportBtn.disabled = false;
    }).catch((error) => {
        console.error('PDF generation failed:', error);
        exportBtn.innerHTML = originalText;
        exportBtn.disabled = false;
        alert('Failed to generate PDF. Please try again.');
    });
}

// Search functionality for stations
document.getElementById('station-search').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const tableRows = document.querySelectorAll('.dashboard-table tbody tr');

    tableRows.forEach(row => {
        const stationName = row.cells[0]?.textContent.toLowerCase() || '';
        if (stationName.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});