<?php
include '../connection.php';

$filter = isset($_POST['filter']) ? $_POST['filter'] : '';

// Handle the case when the filter is empty (optional)
if ($filter == 'Purok') {
    $stmt = $conn->prepare("SELECT * FROM patient ORDER BY patient_id DESC");
} else {
    $stmt = $conn->prepare("SELECT * FROM patient WHERE purok = ? ORDER BY patient_id DESC");    
    $stmt->bind_param("s", $filter);
}

// Execute the statement
$stmt->execute();

// Get the result
$result = $stmt->get_result();
$characters = [];

// Fetch the results and store them in an array
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $characters[] = $row;
    }
}

// Set the appropriate content-type header
header('Content-Type: application/json');

// Return the result as a JSON response
echo json_encode($characters);

// Close the statement and connection
$stmt->close();
$conn->close();
?>
