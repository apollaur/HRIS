// Pagination state
let currentPage = 1;
const itemsPerPage = 10;
let allPositions = [];

// Load and populate positions table
async function loadPositionsData() {
    try {
        const response = await fetch('data/position.json');
        allPositions = await response.json();
        
        // Calculate column totals
        let total21_24 = 0, total25_34 = 0, total35_44 = 0, total45_54 = 0, total55_64 = 0, total65_above = 0;
        
        allPositions.forEach(position => {
            total21_24 += position['21-24'];
            total25_34 += position['25-34'];
            total35_44 += position['35-44'];
            total45_54 += position['45-54'];
            total55_64 += position['55-64'];
            total65_above += position['65 & Above'];
        });
        
        const grandTotal = total21_24 + total25_34 + total35_44 + total45_54 + total55_64 + total65_above;
        
        // Update total row in header
        document.getElementById('total21_24').textContent = total21_24;
        document.getElementById('total25_34').textContent = total25_34;
        document.getElementById('total35_44').textContent = total35_44;
        document.getElementById('total45_54').textContent = total45_54;
        document.getElementById('total55_64').textContent = total55_64;
        document.getElementById('total65_above').textContent = total65_above;
        document.getElementById('grandTotal').textContent = grandTotal;
        
        // Reset to first page and render
        currentPage = 1;
        renderTable();
        renderPagination();
    } catch (error) {
        console.error('Error loading positions data:', error);
    }
}

// Render table for current page
function renderTable() {
    const tableBody = document.getElementById('positionsTableBody');
    tableBody.innerHTML = '';
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = allPositions.slice(startIndex, endIndex);
    
    pageData.forEach(position => {
        const row = document.createElement('tr');
        
        // Calculate total for this position
        const total = position['21-24'] + position['25-34'] + position['35-44'] + 
                     position['45-54'] + position['55-64'] + position['65 & Above'];
        
        row.innerHTML = `
            <td class="bold-cell">${position.Position}</td>
            <td>${position['21-24']}</td>
            <td>${position['25-34']}</td>
            <td>${position['35-44']}</td>
            <td>${position['45-54']}</td>
            <td>${position['55-64']}</td>
            <td>${position['65 & Above']}</td>
            <td>${total}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Render pagination controls
function renderPagination() {
    const totalPages = Math.ceil(allPositions.length / itemsPerPage);
    const paginationContainer = document.getElementById('paginationContainer');
    
    if (!paginationContainer) return;
    
    let paginationHTML = `
        <div class="pagination">
            <button class="pagination-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
                <i class="fa-solid fa-chevron-left"></i>
            </button>
            <span class="pagination-info">Page ${currentPage} of ${totalPages}</span>
            <button class="pagination-btn" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    `;
    
    paginationContainer.innerHTML = paginationHTML;
}

// Change page
function changePage(newPage) {
    const totalPages = Math.ceil(allPositions.length / itemsPerPage);
    if (newPage < 1 || newPage > totalPages) return;
    
    currentPage = newPage;
    renderTable();
    renderPagination();
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', loadPositionsData);
