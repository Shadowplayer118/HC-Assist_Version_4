<?php
include '../../connection.php';

// Allow cross-origin requests from any domain (for development purposes, you can specify a domain instead of '*')
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: POST");

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $staff_id = $_POST['staff_id'] ?? '';
    $first_name = $_POST['first_name'] ?? '';
    $middle_name = $_POST['middle_name'] ?? '';
    $last_name = $_POST['last_name'] ?? '';
    $age = $_POST['age'] ?? '';
    $birth_date = $_POST['birth_date'] ?? '';
    $gender = $_POST['gender'] ?? '';
    $civil_status = $_POST['civil_status'] ?? '';
    $contact_number = $_POST['contact_number'] ?? '';
    $purok_assigned = $_POST['purok_assigned'] ?? '';
    $password = $_POST['password'] ?? '';
    $position = $_POST['position'] ?? '';


    // Image upload handling
    if (isset($_FILES['add_image'])) {
        $currentDateTime = date('YmdHis'); // Format: YYYYMMDDHHMMSS
        
        // Generate a 5-character random string
        $randomCode = bin2hex(random_bytes(3)); // 3 bytes = 6 characters in hex, but we'll use 5 characters
        $randomCode = substr($randomCode, 0, 5); // Take only the first 5 characters

        // Construct the filename with current date-time and random 5-character code
        $imageFileName = "staffImage" . $currentDateTime . $randomCode . '.' . pathinfo($_FILES['add_image']['name'], PATHINFO_EXTENSION);
        
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
    $sql = "INSERT INTO staff (position, password, first_name, middle_name, last_name, age, birth_date, gender, civil_status, purok_assigned, contact_number, image) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("sssssissssss", $position, $password, $first_name, $middle_name, $last_name, $age, $birth_date, $gender, $civil_status, $purok_assigned, $contact_number, $imagePath);
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
