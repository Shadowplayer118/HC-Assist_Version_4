// Current month and year variables
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Function to change the month
function changeMonth(direction) {
    currentMonth += direction;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear -= 1;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear += 1;
    }
    loadCalendar(currentMonth, currentYear);
}

// Function to load the calendar dynamically via AJAX
function loadCalendar(month, year) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `calendar.php?month=${month + 1}&year=${year}`, true); // month + 1 since JS months are 0-indexed
    xhr.onload = function () {
        if (this.status === 200) {
            const calendarData = JSON.parse(this.responseText);
            document.getElementById('month-year').innerText = calendarData.monthYear;
            document.getElementById('calendar-dates').innerHTML = calendarData.datesHTML;
        }
    };
    xhr.send();
}

// Load the current month when the page loads
document.addEventListener('DOMContentLoaded', function () {
    loadCalendar(currentMonth, currentYear);
});
