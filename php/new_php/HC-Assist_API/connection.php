<?php
$host = "localhost";
$user = "root";
$pass = ""; // Make sure to replace this with your actual database password if it's not empty.
$db_name = "hc-assist_database1"; // Your database name.

$conn = mysqli_connect($host, $user, $pass, $db_name);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
