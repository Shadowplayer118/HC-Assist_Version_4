<?php

include '../connection.php';

$patient_id = $_POST['edit-patient_id'];
$name = $_POST['edit-first_name'];
$disease_name = $_POST['disease_name'];
$diagnosis_date = $_POST['diagnosis_date'];
$disease_status = $_POST['disease_status'];
$disease_stage = $_POST['disease_stage'];


$sql = "INSERT INTO contagious_disease (patient_id,disease_name,disease_status,disease_stage,diagnosis_date) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

// Correct type specifiers and added missing variable
$stmt->bind_param("issss", $patient_id,$disease_name,$disease_status,$disease_stage, $diagnosis_date);

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
