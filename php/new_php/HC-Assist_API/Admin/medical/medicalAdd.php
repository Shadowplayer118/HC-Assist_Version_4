<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
include '../../connection.php';

// Check connection
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Database connection failed: ' . $conn->connect_error]));
}

// Retrieve POST data
$patient_id = $_POST['patient_id'] ?? null;
$child_status = $_POST['patient_status'] ?? null;
$weight = $_POST['weight'] ?? null;
$height = $_POST['height'] ?? null;
$blood_pressure = $_POST['blood_pressure'] ?? null;
$heart_rate = $_POST['heart_rate'] ?? null;
$temperature = $_POST['temperature'] ?? null;

// Validate required fields
if (!$patient_id) {
    echo json_encode(['status' => 'error', 'message' => 'Patient ID is required.']);
    exit;
}

// Insert into medical_record
$diagnosis_date = date('Y-m-d'); // Current date

$sql = "INSERT INTO medical_record (patient_id, medical_status, weight, height, blood_pressure, heart_rate, temperature)
        VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    die(json_encode(['status' => 'error', 'message' => 'Prepare failed: ' . $conn->error]));
}

$stmt->bind_param("isiiiii", $patient_id, $child_status, $weight, $height, $blood_pressure, $heart_rate, $temperature);

if ($stmt->execute()) {
    // Get the latest medical_id
    $latestMedical = $conn->insert_id;

    // Insert into medical_history
    $sql_schedule = "INSERT INTO medical_history (history_date, medical_id) VALUES (?, ?)";
    $stmt_schedule = $conn->prepare($sql_schedule);

    if (!$stmt_schedule) {
        die(json_encode(['status' => 'error', 'message' => 'Prepare failed: ' . $conn->error]));
    }

    $stmt_schedule->bind_param("si", $diagnosis_date, $latestMedical);

    if ($stmt_schedule->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Data added successfully!', 'latestMedical' => $latestMedical]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to add to medical_history: ' . $stmt_schedule->error]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to add to medical_record: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
