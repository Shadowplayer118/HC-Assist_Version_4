<?php
// Database connection details
include '../../connection.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to count rows in the table
$sql = "SELECT COUNT(*) AS total_rows FROM referrals";
$result = $conn->query($sql);

// Check if there are results and display the count
if ($result->num_rows > 0) {
    // Fetch the result as an associative array
    $row = $result->fetch_assoc();
    echo $row['total_rows'];
} else {
    echo "0 results";
}

// Close the connection
$conn->close();
?>
