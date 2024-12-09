<?php
session_start();
include 'connection.php'; // Include your database connection file

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Prepare and execute the statement for staff login
    $stmt = $conn->prepare("SELECT first_name, last_name, position FROM staff WHERE username = ? AND password = ?");
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows == 1) {
        $stmt->bind_result($first_name, $last_name, $position); // Bind the result to variables
        $stmt->fetch(); // Fetch the result
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $username;
        $_SESSION['position'] = $position; // Store the userType in the session
        $_SESSION['first_name'] = $first_name; // Store the first name in session
        $_SESSION['last_name'] = $last_name; // Store the last name in session
        
        if ($position == 'Admin') {
            header('Location: Admin_Side/dashboard_folder/dashboard.html');
            exit();
        } elseif ($position == 'Staff') {
            header('Location: Staff_Side/dashboard_folder/dashboard.html');
            exit();
        } elseif ($position == 'Midwife') {
            header('Location: Midwife_Side/midwife_dashboard.html');
            exit();
        }
    } else {
        // Staff login failed, check if it's a patient
        $stmt2 = $conn->prepare("SELECT patient_id, first_name, last_name FROM patient WHERE CONCAT(first_name, ' ', last_name) = ? AND password = ?");
        $stmt2->bind_param("ss", $username, $password); // Assuming patients log in with full name
        $stmt2->execute();
        $stmt2->store_result();

        if ($stmt2->num_rows == 1) {
            $stmt2->bind_result($patient_id, $first_name, $last_name); // Bind the result to variables
            $stmt2->fetch(); // Fetch the result
            $_SESSION['loggedin'] = true;
            $_SESSION['username'] = $username;
            $_SESSION['position'] = 'Patient'; // Store as a patien
            $_SESSION['patient_id'] = $patient_id; // Store the first name in session
            $_SESSION['first_name'] = $first_name; // Store the first name in session
            $_SESSION['last_name'] = $last_name; // Store the first name in session

            header('Location: Patient_Side/referral_folder/referral.php');
            exit();
        } else {
            // Neither staff nor patient found
            echo "<script>
                alert('Incorrect Credentials!');
                window.location.href = 'index.html';
            </script>";
        }
        $stmt2->close();
    }
    $stmt->close();
}
?>
