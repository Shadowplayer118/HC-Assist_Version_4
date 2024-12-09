<?php
include '../connection.php';

$response = [];

// Queries to count records in each table
$queries = [
    "Patients" => "SELECT COUNT(*) AS total FROM patient",
    "Pregnant" => "SELECT COUNT(*) AS total FROM pregnant",
    "Staff" => "SELECT COUNT(*) AS total FROM staff",
    "Disease" => "SELECT COUNT(*) AS total FROM contagious_disease",
    "Child" => "SELECT COUNT(*) AS total FROM child_nutrition",
    "Referrals" => "SELECT COUNT(*) AS total FROM referrals",
    "Immunization" => "SELECT COUNT(*) AS total FROM immunization"


];

foreach ($queries as $tableName => $query) {
    $result = mysqli_query($conn, $query);
    if ($result && $row = mysqli_fetch_assoc($result)) {
        $response[] = [
            "category" => $tableName,
            "count" => $row['total']
        ];
    }
}

// Send response as JSON
echo json_encode($response);

mysqli_close($conn);
?>
