<?php
// Database connection details
include '../../connection.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// First SQL query to get the count from child_nutrition
$sql1 = "SELECT COUNT(*) AS total_rows FROM referrals";
$result1 = $conn->query($sql1);

// Handle the first query result
if ($result1->num_rows > 0) {
    $row1 = $result1->fetch_assoc();
    $x = $row1['total_rows'];  // Extract the count value
} else {
    echo "No results for child_nutrition<br>";
    $x = 0;  // Handle case if no results
}

// Second SQL query (make sure to specify the correct table name)
$sql2 = "SELECT COUNT(*) AS total_rows FROM patient";  // Replace 'patients' with your actual table name
$result2 = $conn->query($sql2);

// Handle the second query result
if ($result2->num_rows > 0) {
    $row2 = $result2->fetch_assoc();
    $totalPatients = $row2['total_rows'];  // Extract the count value
} else {
    echo "No results for patients<br>";
    $totalPatients = 1;  // Avoid division by zero
}

// Calculate percentage and handle division safely
if ($totalPatients > 0) {
    $value = ($x / $totalPatients) * 100;
    echo number_format($value, 2) . "%";
} else {
    echo "Cannot calculate percentage, total patients is zero.";
}

// Close the connection
$conn->close();
?>
