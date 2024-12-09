<?php
// Get the month and year from the AJAX request
$month = isset($_GET['month']) ? (int)$_GET['month'] : date('n');
$year = isset($_GET['year']) ? (int)$_GET['year'] : date('Y');

// Function to build the calendar HTML
function build_calendar($month, $year) {
    // First day of the month
    $firstDayOfMonth = mktime(0, 0, 0, $month, 1, $year);
    $daysInMonth = date('t', $firstDayOfMonth); // Total days in the month
    $monthName = date('F', $firstDayOfMonth);
    $dayOfWeek = date('w', $firstDayOfMonth); // Day of the week the month starts on

    $calendarHTML = '';
    $currentDay = 1;

    // Add empty cells for days before the 1st of the month
    for ($i = 0; $i < $dayOfWeek; $i++) {
        $calendarHTML .= '<div></div>';
    }

    // Add the days of the month
    while ($currentDay <= $daysInMonth) {
        $calendarHTML .= "<div>$currentDay</div>";
        $currentDay++;
    }

    // Return the calendar
    return $calendarHTML;
}

// Build the calendar for the current month and year
$calendarHTML = build_calendar($month, $year);
$monthYear = date('F Y', mktime(0, 0, 0, $month, 1, $year));

// Send the response back as JSON
echo json_encode([
    'monthYear' => $monthYear,
    'datesHTML' => $calendarHTML
]);
?>
