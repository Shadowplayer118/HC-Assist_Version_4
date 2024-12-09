<?php
include '../connection.php';

if (!isset($_POST['staff_id'])) {
    echo json_encode(['error' => 'Form data missing']);
    exit;
}

$staff_id = intval($_POST['staff_id']);
$first_name = htmlspecialchars(trim($_POST['first_name']));
$middle_name = htmlspecialchars(trim($_POST['middle_name']));
$last_name = htmlspecialchars(trim($_POST['last_name']));
$gender = htmlspecialchars(trim($_POST['gender']));
$purok_assigned = htmlspecialchars(trim($_POST['purok_assigned']));
$position = htmlspecialchars(trim($_POST['position']));
$image = htmlspecialchars(trim($_POST['image']));
$age = intval($_POST['age']);
$contact_number = htmlspecialchars(trim($_POST['contact_number']));
$signature = htmlspecialchars(trim($_POST['signature']));
$username = $first_name . " " . $last_name;

$sql = "UPDATE staff SET first_name = ?, middle_name = ?, last_name = ?, gender = ?, purok_assigned = ?, position = ?, image = ?, age = ?, contact_number = ?, signature = ?, username = ? WHERE staff_id = ?";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    echo json_encode(['status' => 'error', 'message' => 'Failed to prepare statement']);
    exit;
}

$stmt->bind_param("sssssssisssi", $first_name, $middle_name, $last_name, $gender, $purok_assigned, $position, $image, $age, $contact_number, $signature, $username, $staff_id);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Character updated successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to update character.']);
}

$stmt->close();
$conn->close();
?>
