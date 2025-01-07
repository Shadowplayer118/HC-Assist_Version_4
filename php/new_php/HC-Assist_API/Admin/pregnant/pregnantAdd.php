<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
include '../../connection.php';

// Retrieve POST data
// $data = json_decode(file_get_contents("php://input"), true);

// Validate data
$patient_id = $_POST['Pregnant_patient_id'] ?? null;
$start_date = $_POST['start_date'] ?? null;
$expected_due_date = $_POST['expected_due_date'] ?? null;
$pregnancy_status = $_POST['pregnancy_status'] ?? null;
$father = $_POST['father'] ?? null; 
$father_contact = $_POST['father_contact'] ?? null;
$second_trimester = $_POST['second_trimester'] ?? null;
$third_trimester = $_POST['third_trimester'] ?? null;

if (!$patient_id || !$start_date || !$expected_due_date || !$pregnancy_status || !$father || !$father_contact) {
    echo json_encode(["success" => false, "message" => "Missing required fields."]);
    exit;
}

// Insert data into 'pregnant'
$query = "INSERT INTO pregnant (patient_id, start_date, expected_due_date, pregnancy_status, father, father_contact) 
          VALUES ('$patient_id', '$start_date', '$expected_due_date', '$pregnancy_status', '$father', '$father_contact')";

if (mysqli_query($conn, $query)) {
    $latest_id = mysqli_insert_id($conn);

    // Check if 'second_trimester' field is passed
    $trimester_check = isset($second_trimester) ? "Yes" : "No";

    // Insert data into 'pregnant_schedule'
    $schedules = [
        ["date" => $second_trimester, "activity" => "Second Trimester"],
        ["date" => $third_trimester, "activity" => "Third Trimester"],
        ["date" => $expected_due_date, "activity" => "Birth"],
    ];

    foreach ($schedules as $schedule) {
        if (!empty($schedule["date"])) {
            $schedule_query = "INSERT INTO pregnant_schedule (pregnant_id, pregnant_schedule_date, activity, status) 
                               VALUES ('$latest_id', '{$schedule['date']}', '{$schedule['activity']}', 'Good')";
            mysqli_query($conn, $schedule_query);
        }
    }

    echo json_encode("success");
} else {
    echo json_encode(["success" => false, "message" => "Failed to insert data into pregnant."]);
}

mysqli_close($conn);
?>
