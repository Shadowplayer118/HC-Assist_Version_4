<?php

include '../connection.php';

// Check if the 'id' parameter is set in the GET request
if (!isset($_GET['id'])) {
    echo json_encode(['error' => 'ID parameter missing']);
    exit;
}

$staff_id = intval($_GET['id']); // Securely get and cast the 'id' parameter to an integer

// SQL query with a placeholder for the staff ID
$sql = "SELECT staff_id, first_name, middle_name, last_name, birth_date, gender, purok_assigned, position, civil_status, image, age, contact_number, signature FROM staff WHERE staff_id = ?";
$stmt = $conn->prepare($sql);

// Check if the statement was prepared successfully
if ($stmt === false) {
    echo json_encode(['error' => 'Failed to prepare statement']);
    exit;
}

// Bind the parameter to the statement
$stmt->bind_param("i", $staff_id);

// Execute the prepared statement
$stmt->execute();

// Bind the result variables
$stmt->bind_result($staff_id, $first_name, $middle_name, $last_name, $birth_date, $gender, $purok_assigned, $position, $civil_status, $image, $age, $contact_number, $signature);

// Fetch the results and output them as a JSON object
if ($stmt->fetch()) {
    echo json_encode([
        'staff_id' => $staff_id,
        'first_name' => $first_name,
        'middle_name' => $middle_name,
        'last_name' => $last_name,
        'birth_date' => $birth_date,
        'gender' => $gender,
        'purok_assigned' => $purok_assigned,
        'position' => $position,
        'civil_status' => $civil_status,
        'image' => $image,
        'age' => $age,
        'contact_number' => $contact_number,
        'signature' => $signature
    ]);
} else {
    echo json_encode(['error' => 'Staff not found']);
}

// Close the statement and the database connection
$stmt->close();
$conn->close();

?>
