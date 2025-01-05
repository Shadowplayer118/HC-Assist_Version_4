<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
// Include database connection file
include '../../connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Retrieve the workflow_id from the query parameter
    $workflow_id = isset($_GET['workflow_id']) ? $_GET['workflow_id'] : '';
 

    if (empty($workflow_id)) {
        // Return an error if workflow_id is not provided
        echo json_encode(['error' => 'Workflow ID is required']);
        exit;
    }

    // Prepare the SQL query to retrieve active steps
    $query = "SELECT * FROM active_steps WHERE workflow_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $workflow_id); // 'i' for integer type
    $stmt->execute();

    $result = $stmt->get_result();
    $steps = [];

    // Fetch all rows and store them in the steps array
    while ($row = $result->fetch_assoc()) {
        $steps[] = $row;
    }

    // Return the steps as a JSON response
    echo json_encode($steps);
} else {
    // If not a GET request, return an error message
    echo json_encode(['error' => 'Invalid request method']);
}
?>
