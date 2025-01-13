<?php

// Enable CORS to allow requests from React
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
include '../../connection.php';

// Prepare and execute the SQL query
$sqlQuery = "
    SELECT 
        child_nutrition.child_id, 
        patient.first_name, 
        patient.last_name, 
        patient.image,
        child_nutrition.child_status, 
        child_nutrition.guardian 
    FROM child_nutrition 
    INNER JOIN patient 
    ON child_nutrition.patient_id = patient.patient_id 
    ORDER BY child_id DESC
";
$result = mysqli_query($conn, $sqlQuery);

// Check for data and return JSON response
if ($result) {
    if ($result->num_rows > 0) {
        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data);
    } else {
        echo json_encode([]);
    }
} else {
    // If the query fails, return an error message
    echo json_encode(["error" => "Failed to execute query"]);
}

// Close the database connection
$conn->close();
?>
