<?php
// Enable CORS for API usage
// Add this at the top of your PHP file
header('Access-Control-Allow-Origin: *');  // This allows all domains; you can restrict it to a specific domain if needed
header('Access-Control-Allow-Methods: GET, POST, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type'); // Allow headers you need (e.g., Content-Type for JSON)

// If it's an OPTIONS request, just send the appropriate response and stop further execution
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200); // 200 OK
    exit();
}

// Database credentials
include '../../connection.php';

try {
    // Connect to the database

    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }

    // Decode the incoming JSON payload
    $input = json_decode(file_get_contents("php://input"), true);

    // Extract values from the JSON input
    $workflow_id = $input['workflow_id'] ?? null;
    $staffId = $input['staffId'] ?? null;
    $patientId = $input['patientId'] ?? null;
    $steps = $input['steps'] ?? []; // Array of steps
    $assignedDeadline = $input['assignedDeadline'] ?? null;
    $assignedDeadline = date('Y-m-d', strtotime($assignedDeadline)); 
    $assignedDeadline = date('Y-m-d');



    if (!$workflow_id || !$staffId || !$patientId || empty($steps)) {
        throw new Exception("Missing required fields");
    }


    // Fetch `title` and `description` from the `workflow` table
    $stmt = $conn->prepare("SELECT title, description FROM workflow WHERE workflow_id = ?");
    $stmt->bind_param("i", $workflow_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        throw new Exception("Workflow not found");
    }

    $workflow = $result->fetch_assoc();
    $title = $workflow['title'];
    $description = $workflow['description'];

    // Insert into `active_workflow` table
    $insertActiveWorkflow = $conn->prepare("
    INSERT INTO active_workfow (staff_id, patient_id, active_title, active_description, active_status, deadline)
    VALUES (?, ?, ?, ?, ?, ?)
");
$active_status = 'Not Finished';
$insertActiveWorkflow->bind_param("iissss", $staffId, $patientId, $title, $description, $active_status, $assignedDeadline);
$insertActiveWorkflow->execute();
    // Get the latest activeWorkflow_id from active_workflow
    $activeWorkflow_id = $conn->insert_id; // This will give the last inserted ID

    if (!$activeWorkflow_id) {
        throw new Exception("Failed to retrieve activeWorflow_id");
    }

    // Insert each step into the `active_steps` table
    $insertActiveSteps = $conn->prepare("
        INSERT INTO active_steps (activeStep_name, activeStep_sequence, activeStep_status, workflow_id)
        VALUES (?, ?, ?, ?)
    ");

    foreach ($steps as $step) {
        $step_name = $step['step_name'];
        $step_sequence = $step['sequence'];

        if($step_sequence == 1){
            $activeStep_status = "Current";
        }
        else{
            $activeStep_status = "Pending";
        }
         // As specified

        // Bind the parameters for the insert query
        $insertActiveSteps->bind_param("sisi", $step_name, $step_sequence, $activeStep_status, $activeWorkflow_id);
        $insertActiveSteps->execute();
    }

    // Send a success response
    echo json_encode(['status' => 'success', 'message' => 'Data inserted successfully']);
} catch (Exception $e) {
    // Handle errors and send a response
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
} finally {
    // Close the database connection
    if (isset($stmt)) {
        $stmt->close();
    }
    if (isset($insertActiveWorkflow)) {
        $insertActiveWorkflow->close();
    }
    if (isset($insertActiveSteps)) {
        $insertActiveSteps->close();
    }
    if (isset($conn)) {
        $conn->close();
    }
}
