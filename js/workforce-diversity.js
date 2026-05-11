// Workforce Diversity Table Pagination
let diversityPage = 0;
let diversityData = null;

async function loadWorkforceDiversity() {
    try {
        const response = await fetch('data/workforce-diversity.json');
        diversityData = await response.json();
        
        // Update top total row
        const topTotal = diversityData.topTotal;
        document.getElementById('wd-total-21-24').textContent = topTotal['21-24'];
        document.getElementById('wd-total-25-34').textContent = topTotal['25-34'];
        document.getElementById('wd-total-35-44').textContent = topTotal['35-44'];
        document.getElementById('wd-total-45-54').textContent = topTotal['45-54'];
        document.getElementById('wd-total-55-64').textContent = topTotal['55-64'];
        document.getElementById('wd-total-65+').textContent = topTotal['65+'];
        document.getElementById('wd-grand-total').textContent = topTotal.total;
        
        // Update overall subtotal row
        const subtotals = diversityData.subtotals;
        document.getElementById('wd-sub-21-24m').textContent = subtotals['21-24m'];
        document.getElementById('wd-sub-21-24f').textContent = subtotals['21-24f'];
        document.getElementById('wd-sub-25-34m').textContent = subtotals['25-34m'];
        document.getElementById('wd-sub-25-34f').textContent = subtotals['25-34f'];
        document.getElementById('wd-sub-35-44m').textContent = subtotals['35-44m'];
        document.getElementById('wd-sub-35-44f').textContent = subtotals['35-44f'];
        document.getElementById('wd-sub-45-54m').textContent = subtotals['45-54m'];
        document.getElementById('wd-sub-45-54f').textContent = subtotals['45-54f'];
        document.getElementById('wd-sub-55-64m').textContent = subtotals['55-64m'];
        document.getElementById('wd-sub-55-64f').textContent = subtotals['55-64f'];
        document.getElementById('wd-sub-65+m').textContent = subtotals['65+m'];
        document.getElementById('wd-sub-65+f').textContent = subtotals['65+f'];
        document.getElementById('wd-sub-total').textContent = subtotals.total;
        
        diversityPage = 0;
        renderDiversityDivision();
        renderDiversityPagination();
    } catch (error) {
        console.error('Error loading workforce diversity data:', error);
    }
}

function renderDiversityDivision() {
    const tbody = document.getElementById('wd-division-body');
    tbody.innerHTML = '';
    
    const division = diversityData.divisions[diversityPage];
    
    // Section header row
    const sectionRow = document.createElement('tr');
    sectionRow.className = 'section';
    sectionRow.innerHTML = `<td colspan="14">${division.name}</td>`;
    tbody.appendChild(sectionRow);
    
    // Unit rows
    division.units.forEach(unit => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${unit.name}</td>
            <td>${unit['21-24m']}</td><td>${unit['21-24f']}</td>
            <td>${unit['25-34m']}</td><td>${unit['25-34f']}</td>
            <td>${unit['35-44m']}</td><td>${unit['35-44f']}</td>
            <td>${unit['45-54m']}</td><td>${unit['45-54f']}</td>
            <td>${unit['55-64m']}</td><td>${unit['55-64f']}</td>
            <td>${unit['65+m']}</td><td>${unit['65+f']}</td>
            <td>${unit.total}</td>
        `;
        tbody.appendChild(row);
    });
    
    // Division subtotal row
    const subtotalRow = document.createElement('tr');
    subtotalRow.className = 'subtotal';
    const s = division.subtotal;
    subtotalRow.innerHTML = `
        <td>SUBTOTAL</td>
        <td>${s['21-24m']}</td><td>${s['21-24f']}</td>
        <td>${s['25-34m']}</td><td>${s['25-34f']}</td>
        <td>${s['35-44m']}</td><td>${s['35-44f']}</td>
        <td>${s['45-54m']}</td><td>${s['45-54f']}</td>
        <td>${s['55-64m']}</td><td>${s['55-64f']}</td>
        <td>${s['65+m']}</td><td>${s['65+f']}</td>
        <td>${s.total}</td>
    `;
    tbody.appendChild(subtotalRow);
}

function renderDiversityPagination() {
    const container = document.getElementById('wd-pagination');
    if (!container) return;
    
    const totalPages = diversityData.divisions.length;
    const currentName = diversityData.divisions[diversityPage].name;
    
    container.innerHTML = `
        <div class="pagination">
            <button class="pagination-btn" onclick="changeDiversityPage(${diversityPage - 1})" ${diversityPage === 0 ? 'disabled' : ''}>
                <i class="fa-solid fa-chevron-left"></i>
            </button>
            <span class="pagination-info">${currentName} (${diversityPage + 1}/${totalPages})</span>
            <button class="pagination-btn" onclick="changeDiversityPage(${diversityPage + 1})" ${diversityPage === totalPages - 1 ? 'disabled' : ''}>
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    `;
}

function changeDiversityPage(newPage) {
    const totalPages = diversityData.divisions.length;
    if (newPage < 0 || newPage >= totalPages) return;
    
    diversityPage = newPage;
    renderDiversityDivision();
    renderDiversityPagination();
}

document.addEventListener('DOMContentLoaded', loadWorkforceDiversity);
