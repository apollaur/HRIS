// Dropdown functionality for navigation menu
function toggleDropdown(element) {
    const parent = element.parentElement;
    const icon = element.querySelector('.dropdown-icon');
    
    // Toggle the class that triggers the CSS expansion
    parent.classList.toggle('active-parent');
    
    // Flip the chevron icon
    if (parent.classList.contains('active-parent')) {
        icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
    } else {
        icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    }
}

// Automatically highlight COS dropdown when on COS-related pages
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const cosDropdown = document.querySelector('.has-dropdown');
    
    // Check if current page is a COS-related page
    if (currentPath.includes('cos.html') || currentPath.includes('cos-filled.html') || currentPath.includes('cos-vacant.html')) {
        if (cosDropdown) {
            cosDropdown.classList.add('active-parent');
            const icon = cosDropdown.querySelector('.dropdown-icon');
            if (icon) {
                icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            }
        }
    }
});
