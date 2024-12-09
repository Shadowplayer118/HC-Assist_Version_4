<?php
// Enable CORS
header("Access-Control-Allow-Origin: *"); // Allow all domains to access the resources
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Allow methods
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With"); // Allow headers

// Database connection
$host = "localhost";
$user = "root";
$pass = "";
$db_name = "hc-assist_database1";

// Connect to the database
$conn = mysqli_connect($host, $user, $pass, $db_name);
if (!$conn) {
    die(mysqli_error($conn));
}
?>
