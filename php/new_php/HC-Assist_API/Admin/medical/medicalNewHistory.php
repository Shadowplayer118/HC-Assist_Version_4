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
$medical_id = $_POST['medical_id'] ?? null;

// Validate required fields
if (!$medical_id) {
    echo json_encode(['status' => 'error no id', 'message' => 'Patient ID and Medical ID are required.']);
    $conn->close();
    exit;
}

// Prepare SQL
$diagnosis_date = date('Y-m-d'); // Current date

$conn->begin_transaction();

try {
    // Update medical_record
    $sql = "UPDATE medical_record
            SET patient_id = ?, medical_status = ?, weight = ?, height = ?, blood_pressure = ?, heart_rate = ?, temperature = ?
            WHERE medical_id = ?";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        throw new Exception('Prepare failed: ' . $conn->error);
    }

    $stmt->bind_param("isiiiiii", $patient_id, $child_status, $weight, $height, $blood_pressure, $heart_rate, $temperature, $medical_id);
    if (!$stmt->execute()) {
        throw new Exception('Failed to update medical_record: ' . $stmt->error);
    }

    // Insert into medical_history
    $sql_schedule = "INSERT INTO medical_history (history_date, medical_id) VALUES (?, ?)";
    $stmt_schedule = $conn->prepare($sql_schedule);
    if (!$stmt_schedule) {
        throw new Exception('Prepare failed: ' . $conn->error);
    }

    $stmt_schedule->bind_param("si", $diagnosis_date, $medical_id);
    if (!$stmt_schedule->execute()) {
        throw new Exception('Failed to add to medical_history: ' . $stmt_schedule->error);
    }

    // Commit transaction
    $conn->commit();
    echo json_encode(['status' => 'success', 'message' => 'Data updated successfully!', 'latestMedical' => $medical_id]);
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(['status' => 'error all', 'message' => $e->getMessage()]);
}

$stmt->close();
$conn->close();
?>
