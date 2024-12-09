<?php

include '../connection.php';

$patient_id = $_POST['edit-patient_id'];
$name = $_POST['edit-first_name'];
$child_status = $_POST['child_status'];
$weight = $_POST['weight'];
$height = $_POST['height'];
$blood_pressure = $_POST['blood_pressure'];
$heart_rate = $_POST['heart_rate'];
$temperature = $_POST['temperature'];
$guardian = $_POST['guardian'];
$guardian_contact = $_POST['guardian_contact'];



$sql = "INSERT INTO child_nutrition (patient_id, child_status, weight, height,blood_pressure, heart_rate, temperature,
guardian, guardian_contact) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

// Correct type specifiers and added missing variable
$stmt->bind_param("isddddiss", $patient_id, $child_status, $weight, $height, $blood_pressure, $heart_rate, $temperature, 
$guardian, $guardian_contact);

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
