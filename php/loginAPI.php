<?php
session_start();
include 'connection.php'; // Include your database connection file

header('Access-Control-Allow-Origin: *'); // You can replace '*' with a specific domain, e.g., 'https://example.com'
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Content-Type: application/json');

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $input = json_decode(file_get_contents('php://input'), true);
    $username = $input['username'] ?? '';
    $password = $input['password'] ?? '';
    // Validate inputs
    if (empty($username) || empty($password)) {
        echo json_encode(["status" => false, "message" => "Username and password are required."]);
        exit();
    }
    // Prepare and execute the statement for staff login
    $stmt = $conn->prepare("SELECT staff_id, first_name, last_name, position FROM staff WHERE username = ? AND password = ?");
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows == 1) {
        $stmt->bind_result($staff_id, $first_name, $last_name, $position);
        $stmt->fetch();

        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $username;
        $_SESSION['position'] = $position;
        $_SESSION['first_name'] = $first_name;
        $_SESSION['last_name'] = $last_name;

        echo json_encode([
            "status" => true,
            "message" => "Login successful.",
            "user" => [
                "staff_id" => $staff_id,
                "username" => $username,
                "first_name" => $first_name,
                "last_name" => $last_name,
                "position" => $position
            ]
        ]);
    } else {
        // Check if it's a patient login
        $stmt2 = $conn->prepare("SELECT patient_id, first_name, last_name FROM patient WHERE CONCAT(first_name, ' ', last_name) = ? AND password = ?");
        $stmt2->bind_param("ss", $username, $password);
        $stmt2->execute();
        $stmt2->store_result();

        if ($stmt2->num_rows == 1) {
            $stmt2->bind_result($patient_id, $first_name, $last_name);
            $stmt2->fetch();

            $_SESSION['loggedin'] = true;
            $_SESSION['username'] = $username;
            $_SESSION['position'] = 'Patient';
            $_SESSION['patient_id'] = $patient_id;
            $_SESSION['first_name'] = $first_name;
            $_SESSION['last_name'] = $last_name;

            echo json_encode([
                "status" => true,
                "message" => "Patient login successful.",
                "user" => [
                    "username" => $username,
                    "first_name" => $first_name,
                    "last_name" => $last_name,
                    "position" => "Patient"
                ]
            ]);
        } else {
            echo json_encode(["status" => false, "message" => "Incorrect credentials."]);
        }
        $stmt2->close();
    }
    $stmt->close();
} else {
    echo json_encode(["status" => false, "message" => "Invalid request method."]);
}
?>
