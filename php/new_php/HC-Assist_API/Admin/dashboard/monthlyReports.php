<?php
include '../../connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Connect to the database


// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query
$query = "
    SELECT 
        (SELECT COUNT(*) FROM patient) AS total_patients,
        (SELECT COUNT(*) FROM patient WHERE gender = 'Male') AS total_boys,
        (SELECT COUNT(*) FROM patient WHERE gender = 'Female') AS total_girls,
        (SELECT COUNT(*) FROM patient WHERE age < 18) AS total_children,
        (SELECT COUNT(*) FROM patient WHERE age > 60) AS total_seniors,
        (SELECT COUNT(*) FROM contagious_disease WHERE disease_status != 'CURED') AS active_diseases,


        (SELECT COUNT(*) FROM pregnant) AS total_pregnancies,
        (SELECT COUNT(*) FROM pregnant WHERE pregnancy_status = 'DELIVERED') AS total_delivered_pregnancies,
        (SELECT COUNT(*) FROM pregnant WHERE pregnancy_status != 'DELIVERED') AS total_ongoing_pregnancies,
        (SELECT COUNT(*) FROM pregnant WHERE pregnancy_status = 'MISCARRIAGE') AS total_miscarriage_pregnancies,
      
        
        (SELECT COUNT(*) FROM immunization) AS total_immunizations,
        (SELECT COUNT(*) FROM referrals WHERE approval_status = 'Approved') AS approved_referrals,


        (SELECT FORMAT(AVG(weight), 2) FROM child_nutrition) AS avg_child_weight,
        (SELECT FORMAT(AVG(height), 2) FROM child_nutrition) AS avg_child_height,
        (SELECT FORMAT(AVG(blood_pressure), 2) FROM child_nutrition) AS avg_child_blood_pressure,
        (SELECT FORMAT(AVG(heart_rate), 2) FROM child_nutrition) AS avg_child_heart_rate,
        (SELECT FORMAT(AVG(temperature), 2) FROM child_nutrition) AS avg_child_temperature,


        
           (SELECT FORMAT(AVG(weight), 2) FROM medical_record) AS avg_weight,
        (SELECT FORMAT(AVG(height), 2) FROM medical_record) AS avg_height,
        (SELECT FORMAT(AVG(blood_pressure), 2) FROM medical_record) AS avg_blood_pressure,
        (SELECT FORMAT(AVG(heart_rate), 2) FROM medical_record) AS avg_heart_rate,
        (SELECT FORMAT(AVG(temperature), 2) FROM medical_record) AS avg_temperature;
";


// Execute the query
$result = $conn->query($query);

if ($result) {
    // Fetch the single row of data
    $report = $result->fetch_assoc();

    // Return the result as JSON
    echo json_encode([
        'status' => 'success',
        'data' => $report
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Query failed: ' . $conn->error
    ]);
}

// Close the connection
$conn->close();
?>
