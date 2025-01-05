<?php

include '../../connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Check connection
if (!$conn) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . mysqli_connect_error()]);
    exit;
}

// Query to count occurrences of each disease
$diseaseCountQuery = "SELECT disease_name, COUNT(*) as count 
                       FROM contagious_disease 
                       GROUP BY disease_name";
$diseaseCountResult = mysqli_query($conn, $diseaseCountQuery);

if (!$diseaseCountResult) {
    http_response_code(500);
    echo json_encode(['error' => 'Error executing query: ' . mysqli_error($conn)]);
    exit;
}

// Prepare data for pie chart
$response = [];
while ($row = mysqli_fetch_assoc($diseaseCountResult)) {
    $response[] = [
        'purok' => $row['disease_name'], // Replace 'data' with 'purok'
        'count' => $row['count']
    ];
}

// Query to find how many patients are not registered in contagious_disease
$unregisteredPatientsQuery = "SELECT COUNT(*) as count 
                              FROM patient 
                              WHERE patient_id NOT IN (SELECT DISTINCT patient_id FROM contagious_disease)";
$unregisteredPatientsResult = mysqli_query($conn, $unregisteredPatientsQuery);

if ($unregisteredPatientsResult) {
    $unregisteredPatientsCount = mysqli_fetch_assoc($unregisteredPatientsResult)['count'];
    $response[] = [
        'purok' => 'Unregistered Patients', // Replace 'data' with 'purok'
        'count' => $unregisteredPatientsCount
    ];
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error executing query: ' . mysqli_error($conn)]);
    exit;
}

// Close the database connection
mysqli_close($conn);

// Return the JSON response
echo json_encode($response);
?>
