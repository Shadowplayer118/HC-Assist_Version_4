<?php

include '../../connection.php';

// Allow cross-origin requests from any domain (for development purposes, you can specify a domain instead of '*')
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Array to store results
$response = [];

// Tables to count
$tables = ['referrals', 'pregnant', 'contagious_disease', 'child_nutrition', 'immunization'];
$totalEntries = 0;

// Loop through each table and count entries
foreach ($tables as $table) {
    $sql = "SELECT COUNT(*) AS count FROM $table";
    $result = $conn->query($sql);

    if ($result && $row = $result->fetch_assoc()) {
        $response[$table] = (int)$row['count']; // Store the count in the response array
        $totalEntries += (int)$row['count']; // Add to the total count
    } else {
        $response[$table] = 0; // Default to 0 if the query fails
    }
}

// Add the total count to the response
$response['total'] = $totalEntries;

// Output the result as JSON
header('Content-Type: application/json');
echo json_encode($response);

// Close the connection
$conn->close();
?>
