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
$patient_id = $_POST['child_patient_id'] ?? null;
$child_status = $_POST['child_status'] ?? null;
$weight = $_POST['weight'] ?? null;
$height = $_POST['height'] ?? null;
$blood_pressure = $_POST['blood_pressure'] ?? null;
$heart_rate = $_POST['heart_rate'] ?? null;
$temperature = $_POST['temperature'] ?? null;
$guardian = $_POST['guardian'] ?? null;
$guardian_contact = $_POST['guardian_contact'] ?? null;


// Validate required fields
if (!$patient_id) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
    exit;
}

// Insert into contagious_disease
$diagnosis_date = date('Y-m-d'); // Current date
$administered_by = $staffId;

$sql = "INSERT INTO child_nutrition (patient_id, child_status, weight, height, blood_pressure,heart_rate,temperature,guardian,guardian_contact)
        VALUES (?, ?, ?, ?, ?, ?,?,?,?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("isiiiiiss", $patient_id,$child_status,$weight,$height,$blood_pressure,$heart_rate,$temperature,$guardian,$guardian_contact);

if ($stmt->execute()) {
    // Get the latest disease_id
    $latestChild = $conn->insert_id;

    // Determine treatment_type based on disease_name
    $treatment_type = '';
    switch (strtolower($disease_patient_name)) {
        case 'leprosy':
            $treatment_type = 'Leprosy Treatment';
            break;
        case 'tuberculosis':
            $treatment_type = 'TB Treatment';
            break;
        case 'covid':
            $treatment_type = 'COVID Treatment';
            break;
        default:
            $treatment_type = 'General Treatment'; // Default if not one of the specified diseases
    }

    // Insert into disease_schedule
    $activity = $treatment_type;
    $status = "Good";

    $sql_schedule = "INSERT INTO child_history (history_date, child_id)
                     VALUES (?, ?)";

    $stmt_schedule = $conn->prepare($sql_schedule);
    $stmt_schedule->bind_param("si",$diagnosis_date,$latestChild);

    if ($stmt_schedule->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Data added successfully!', 'latestChild' => $latestChild]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to add to disease_schedule: ' . $stmt_schedule->error]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to add to contagious_disease: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
