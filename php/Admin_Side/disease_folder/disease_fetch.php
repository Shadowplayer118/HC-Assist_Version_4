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
$sql = "Select contagious_disease.disease_id, patient.first_name, patient.last_name, contagious_disease.disease_name,
contagious_disease.diagnosis_date, contagious_disease.disease_status, contagious_disease.disease_stage from contagious_disease 
inner join patient on contagious_disease.patient_id = patient.patient_id 
WHERE contagious_disease.disease_id = ?";
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
$stmt->bind_result($disease_id, $first_name, $last_name,$disease_name,$diagnosis_date,$disease_status,$disease_stage);

// Fetch the results and output them as a JSON object
if ($stmt->fetch()) {
    echo json_encode([
        'disease_id' => $disease_id,
        'first_name' => $first_name,
        'last_name' => $last_name,
        'disease_name' => $disease_name,
        'diagnosis_date' => $diagnosis_date,
        'disease_status' => $disease_status,
        'disease_stage' => $disease_stage,
    
    ]);
} else {
    echo json_encode(['error' => 'patient not found']);
}

// Close the statement and the database connection
$stmt->close();
$conn->close();

?>
