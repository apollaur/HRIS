// Calendar Page Logic
let currentYear = new Date().getFullYear();
let expandedMonth = null;

// Calendar Events
const calendarEvents = {
    '2026-4-2': { type: 'holiday', label: 'Holiday' },
    '2026-4-3': { type: 'holiday', label: 'Holiday' },
    '2026-4-9': { type: 'holiday', label: 'Holiday' },
    '2026-5-1': { type: 'holiday', label: 'Labor Day' },
    '2026-5-11': { type: 'booking', label: 'Reserved Booking' },
    '2026-5-12': { type: 'booking', label: 'Reserved Booking' },
    '2026-5-13': { type: 'booking', label: 'Reserved Booking' },
    '2026-6-12': { type: 'holiday', label: 'Independence Day' }
};

function getEvent(year, month, day) {
    return calendarEvents[`${year}-${month + 1}-${day}`] || null;
}

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const DAY_HEADERS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
}

function isToday(year, month, day) {
    const today = new Date();
    return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
}

function renderMiniCalendar(year, month) {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    let html = '';

    DAY_HEADERS.forEach(d => {
        html += `<div class="day-header">${d.charAt(0)}</div>`;
    });

    for (let i = 0; i < firstDay; i++) {
        html += '<div class="day-cell empty"></div>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const todayClass = isToday(year, month, day) ? ' today' : '';
        const event = getEvent(year, month, day);
        const eventClass = event ? ` ${event.type}` : '';
        html += `<div class="day-cell${todayClass}${eventClass}"${event ? ` title="${event.label}"` : ''}>${day}</div>`;
    }

    return html;
}

function renderExpandedCalendar(year, month) {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    let html = '';

    DAY_HEADERS.forEach(d => {
        html += `<div class="day-header">${d}</div>`;
    });

    for (let i = 0; i < firstDay; i++) {
        html += '<div class="day-cell empty"></div>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const todayClass = isToday(year, month, day) ? ' today' : '';
        const dayOfWeek = new Date(year, month, day).getDay();
        const weekendClass = (dayOfWeek === 0 || dayOfWeek === 6) ? ' weekend' : '';
        const event = getEvent(year, month, day);
        const eventClass = event ? ` ${event.type}` : '';
        const eventLabel = event ? `<div class="event-label">${event.label}</div>` : '';
        html += `<div class="day-cell${todayClass}${weekendClass}${eventClass}"${event ? ` title="${event.label}"` : ''}>${day}${eventLabel}</div>`;
    }

    return html;
}

function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    const yearLabel = document.getElementById('yearLabel');
    yearLabel.textContent = currentYear;

    let html = '';
    for (let m = 0; m < 12; m++) {
        const isActive = expandedMonth === m;
        html += `<div class="month-card${isActive ? ' active' : ''}" onclick="toggleMonth(${m})">`;
        html += `<div class="month-card-header">`;
        html += `<h3>${MONTH_NAMES[m]}</h3>`;
        if (isActive) {
            html += `<button class="close-month-btn" onclick="event.stopPropagation(); toggleMonth(null)">Close</button>`;
        } else {
            html += `<span class="year-label">${currentYear}</span>`;
        }
        html += `</div>`;

        if (isActive) {
            html += `<div class="expanded-calendar">${renderExpandedCalendar(currentYear, m)}</div>`;
        } else {
            html += `<div class="mini-calendar">${renderMiniCalendar(currentYear, m)}</div>`;
        }

        html += `</div>`;
    }

    grid.innerHTML = html;
}

function toggleMonth(month) {
    if (expandedMonth === month) {
        expandedMonth = null;
    } else {
        expandedMonth = month;
    }
    renderCalendar();
}

function changeYear(delta) {
    currentYear += delta;
    expandedMonth = null;
    renderCalendar();
}

document.addEventListener('DOMContentLoaded', renderCalendar);
