<?php

include '../connection.php';

$password = $_POST['password'];
$first_name = $_POST['first_name'];
$middle_name = $_POST['middle_name'];
$last_name = $_POST['last_name'];
$gender = $_POST['gender'];
$purok_assigned = $_POST['purok_assigned'];
$position = $_POST['position'];
$civil_status = $_POST['civil_status'];
$age = $_POST['age'];
$contact_number = $_POST['contact_number'];
$username = $first_name . " " . $last_name; // Correct concatenation

$sql = "INSERT INTO staff (username, password, first_name, middle_name, last_name, gender, purok_assigned, position, civil_status, age, contact_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

// Correct type specifiers and added missing variable
$stmt->bind_param("sssssssssis", $username, $password, $first_name, $middle_name, $last_name, $gender, $purok_assigned, $position, $civil_status, $age, $contact_number);

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
