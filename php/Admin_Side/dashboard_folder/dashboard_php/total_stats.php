<?php
// Database connection details
include '../../connection.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Initialize total rows variable
$totalRows = 0;

// List of table names
$tables = ['contagious_disease', 'child_nutrition', 'pregnant', 'immunization', 'referrals'];

// Loop through each table to get the total row count
foreach ($tables as $table) {
    $sql = "SELECT COUNT(*) AS total_rows FROM $table";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $totalRows += $row['total_rows'];  // Add the count to the total
    } else {
        echo "No results for $table<br>";
    }
}

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

// Display total rows from all 5 tables
    $value = ($totalRows / $totalPatients) * 100;
    echo number_format($value, 2) . "%";


// Close the connection
$conn->close();
?>
