<?php
include '../../connection.php';

// Allow cross-origin requests from any domain (for development purposes, you can specify a domain instead of '*')
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: POST");

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $patient_id = $_POST['patient_id'] ?? '';
    $first_name = $_POST['first_name'] ?? '';
    $middle_name = $_POST['middle_name'] ?? '';
    $last_name = $_POST['last_name'] ?? '';
    $age = $_POST['age'] ?? '';
    $birth_date = $_POST['birth_date'] ?? '';
    $gender = $_POST['gender'] ?? '';
    $civil_status = $_POST['civil_status'] ?? '';
    $purok = $_POST['purok'] ?? '';
    $household = $_POST['household'] ?? '';
    $contact_number = $_POST['contact_number'] ?? '';
    $blood_type = $_POST['blood_type'] ?? '';
    $philhealthNum = $_POST['philhealthNum'] ?? '';

    // Image upload handling
    if (isset($_FILES['add_image'])) {
        $currentDateTime = date('YmdHis'); // Format: YYYYMMDDHHMMSS
        
        // Generate a 5-character random string
        $randomCode = bin2hex(random_bytes(3)); // 3 bytes = 6 characters in hex, but we'll use 5 characters
        $randomCode = substr($randomCode, 0, 5); // Take only the first 5 characters

        // Construct the filename with current date-time and random 5-character code
        $imageFileName = "patientImage" . $currentDateTime . $randomCode . '.' . pathinfo($_FILES['add_image']['name'], PATHINFO_EXTENSION);
        
        $targetPath = "../../../../uploads/$imageFileName";

        if (move_uploaded_file($_FILES['add_image']['tmp_name'], $targetPath)) {
            $imagePath = "/uploads/$imageFileName";
        } else {
            $imagePath = '';
        }
    } else {
        $imagePath = '';
    }

    // Prepare SQL query
    $sql = "INSERT INTO patient (password, philhealthNum, first_name, middle_name, last_name, age, birth_date, gender, civil_status, purok, household, contact_number, blood_type, image) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("sssssissssssss", $philhealthNum, $philhealthNum, $first_name, $middle_name, $last_name, $age, $birth_date, $gender, $civil_status, $purok, $household, $contact_number, $blood_type, $imagePath);
        if ($stmt->execute()) {
            echo json_encode(["status" => "success"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Database insertion failed."]);
        }
        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Prepared statement failed."]);
    }

    $conn->close();
}
?>
