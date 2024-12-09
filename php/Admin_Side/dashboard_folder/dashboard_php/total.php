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



// Display total rows from all 5 tables
echo  $totalRows;

// Close the connection
$conn->close();
?>
