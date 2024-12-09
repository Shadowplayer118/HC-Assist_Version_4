<?php

include '../connection.php';

$patient_id = $_POST['edit-patient_id'];
$name = $_POST['edit-first_name'];
$immunization_name = $_POST['immunization_name'];
$administered_date = $_POST['administered_date'];
$administered_by = $_POST['administered_by'];

$sql = "INSERT INTO immunization (patient_id, immunization_name,administered_date,administered_by ) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

// Correct type specifiers and added missing variable
$stmt->bind_param("isss", $patient_id,$immunization_name,$administered_date,$administered_by);

if ($stmt->execute()) {
    $response = ['status' => 'success', 'message' => 'Character added successfully.'];
    echo json_encode($response);
} else {
    $response = ['status' => 'error', 'message' => 'Failed to add character.'];
    echo json_encode($response);
}

$stmt->close();
$conn->close();
?>
