<?php
include '../connection.php';

$name = isset($_POST['name']) ? $_POST['name'] : '';

// Use prepared statements to avoid SQL injection risks
$stmt = $conn->prepare("SELECT * FROM patient WHERE first_name LIKE ? OR middle_name LIKE ? OR last_name LIKE ? OR contact_number LIKE ?");
$searchTerm = "%$name%";


$stmt->bind_param("ssss", $searchTerm,  $searchTerm,  $searchTerm, $searchTerm);

// Execute the statement
$stmt->execute();

// Get the result
$result = $stmt->get_result();
$characters = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $characters[] = $row;
    }
}

// Close the statement and connection


// Return the result as a JSON response
echo json_encode($characters);

$stmt->close();
$conn->close();
?>
