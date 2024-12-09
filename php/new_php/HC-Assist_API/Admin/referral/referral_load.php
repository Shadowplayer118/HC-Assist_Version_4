<?php
include 'connection.php';

// Query to fetch referral and patient details
$sqlQuery = "SELECT referrals.referral_id, patient.first_name, patient.last_name, referrals.referral_date,
referrals.approval_status 
FROM referrals 
INNER JOIN patient ON referrals.patient_id = patient.patient_id 
ORDER BY referral_id DESC";

$result = mysqli_query($conn, $sqlQuery);

// Return JSON data
if ($result && $result->num_rows > 0) {
    $data = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    // Set the correct headers for JSON response
    header('Content-Type: application/json');
    echo json_encode($data);
} else {
    header('Content-Type: application/json');
    echo json_encode([]);
}

// Close the database connection
$conn->close();
?>
