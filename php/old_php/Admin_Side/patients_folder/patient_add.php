<?php

include '../../connection.php';

// Allow cross-origin requests from any domain (for development purposes, you can specify a domain instead of '*')
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Check if files are uploaded
$image = null;
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $targetDir = "../../images/"; // Path to your image folder
    $targetFile = $targetDir . basename($_FILES["image"]["name"]);

    // Generate a unique name for the uploaded file to avoid conflicts
    $uniqueName = uniqid() . "_" . basename($_FILES["image"]["name"]);
    $uniqueFilePath = $targetDir . $uniqueName;

    // Move the uploaded file to the target directory
    if (move_uploaded_file($_FILES["image"]["tmp_name"], $uniqueFilePath)) {
        $imagePath = 'images/' . $uniqueName; // Relative path to save in the database
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to upload image.']);
        exit;
    }
}

// Read the incoming JSON data from the POST request
$data = json_decode(file_get_contents('php://input'), true);

// Check if JSON decoding was successful
if ($data === null) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON data.']);
    exit;
}

// Extract data from the decoded JSON
$first_name = $data['first_name'];
$middle_name = $data['middle_name'];
$last_name = $data['last_name'];
$gender = $data['gender'];
$purok = $data['purok'];
$household = $data['household'];
$civil_status = $data['civil_status'];
$age = $data['age'];
$contact_number = $data['contact_number'];
$blood_type = $data['blood_type'];
$birth_date = $data['birth_date'];

// SQL query to insert data into the patient table
$sql = "INSERT INTO patient (first_name, middle_name, last_name, gender, purok, household, civil_status, age, contact_number, blood_type, birth_date, image) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

// Prepare the SQL statement
$stmt = $conn->prepare($sql);

// Bind the parameters to the prepared statement
$stmt->bind_param("sssssssissss", $first_name, $middle_name, $last_name, $gender, $purok, $household, $civil_status, $age, $contact_number, $blood_type, $birth_date, $image);

// Execute the query and check for success
if ($stmt->execute()) {
    $response = ['status' => 'success', 'message' => 'Character added successfully.', 'image_url' => $image];
    echo json_encode($response);
} else {
    $response = ['status' => 'error', 'message' => 'Failed to add character.'];
    echo json_encode($response);
}

// Close the prepared statement and database connection
$stmt->close();
$conn->close();
?>
