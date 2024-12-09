<?php

include '../connection.php';

// Check if the 'id' parameter is set in the GET request
if (!isset($_GET['id'])) {
    echo json_encode(['error' => 'ID parameter missing']);
    exit;
}

$patient_id = intval($_GET['id']);

// Securely get and cast the 'id' parameter to an integer

// SQL query with a placeholder for the staff ID
$sql = "Select child_nutrition.child_id, patient.first_name, patient.last_name, child_nutrition.child_status,child_nutrition.weight,
child_nutrition.height, child_nutrition.blood_pressure, child_nutrition.heart_rate, 
child_nutrition.temperature,child_nutrition.guardian,child_nutrition.guardian_contact from child_nutrition 
inner join patient on child_nutrition.patient_id = patient.patient_id 
WHERE child_nutrition.child_id = ?";
$stmt = $conn->prepare($sql);

// Check if the statement was prepared successfully
if ($stmt === false) {
    echo json_encode(['error' => 'Failed to prepare statement']);
    exit;
}

// Bind the parameter to the statement
$stmt->bind_param("i", $patient_id);

// Execute the prepared statement
$stmt->execute();

// Bind the result variables
$stmt->bind_result($child_id, $first_name, $last_name,$child_status,$weight, $height, $blood_pressure, $heart_rate, $temperature, $guardian, $guardian_contact);

// Fetch the results and output them as a JSON object
if ($stmt->fetch()) {
    echo json_encode([
        'child_id' => $child_id,
        'first_name' => $first_name,
        'last_name' => $last_name,
        'child_status' => $child_status,
        'weight' => $weight,
        'height' => $height,
        'blood_pressure' => $blood_pressure,
        'heart_rate' => $heart_rate,
        'temperature' => $temperature,
        'guardian' => $guardian,
        'guardian_contact' => $guardian_contact,
    
    ]);
} else {
    echo json_encode(['error' => 'patient not found']);
}

// Close the statement and the database connection
$stmt->close();
$conn->close();

?>
