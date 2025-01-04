<?php
// Enable CORS for API usage
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// If it's an OPTIONS request, just send the appropriate response and stop further execution
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database credentials
include '../../connection.php';

try {
    // Connect to the database
    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }

    // Prepare the SQL query to get data from active_workflow, patient, and staff
    $query = "
        SELECT 
            aw.activeWorflow_id,
            aw.deadline,
            aw.active_title,
            aw.active_description,
            aw.active_status,
            p.first_name AS patient_first_name,
            p.last_name AS patient_last_name,
            s.first_name AS staff_first_name,
            s.last_name AS staff_last_name
        FROM 
            active_workfow aw
        JOIN patient p ON aw.patient_id = p.patient_id
        JOIN staff s ON aw.staff_id = s.staff_id
    ";

    // Prepare statement
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        throw new Exception("No workflows found");
    }

    // Fetch all results as an associative array
    $workflows = $result->fetch_all(MYSQLI_ASSOC);

    // Send the data as a JSON response
    echo json_encode(
        $workflows
    );

} catch (Exception $e) {
    // Handle errors and send a response
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
} finally {
    // Close the database connection
    if (isset($stmt)) {
        $stmt->close();
    }
    if (isset($conn)) {
        $conn->close();
    }
}
?>
