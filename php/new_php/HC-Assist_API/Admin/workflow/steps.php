<?php
header('Content-Type: application/json'); // Ensure the response is JSON
header('Access-Control-Allow-Origin: *'); // Allow cross-origin requests (adjust for production)

include '../../connection.php';

// Get workflow_id from request
$workflow_id = isset($_GET['workflow_id']) ? intval($_GET['workflow_id']) : 0;




if ($workflow_id > 0) {
    $sqlQuery = "SELECT s.step_name, s.sequence, s.steps_id, w.title
FROM steps s
INNER JOIN workflow w ON s.workflow_id = w.workflow_id
WHERE s.workflow_id = ?
ORDER BY s.sequence ASC;
";
    $stmt = $conn->prepare($sqlQuery);
    $stmt->bind_param("i", $workflow_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $data = [];
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode(
          
            $data
        );
    } else {
        echo json_encode([
            "success" => false,
            "message" => "No steps found for the given workflow ID"
        ]);
    }
    $stmt->close();
} else {
    echo json_encode([
        "success" => false,
        "message" => "Invalid or missing workflow ID"
    ]);
}

$conn->close();
?>
