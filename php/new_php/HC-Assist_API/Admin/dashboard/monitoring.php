<?php

include '../../connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

date_default_timezone_set('Asia/Manila'); // Set your time zone

$currentDate = date('Y-m-d');

// Query to fetch data with date format adjustment
$sql = "
    SELECT 
        p.first_name, 
        p.last_name, 
        p.image, 
        DATE(ps.pregnant_schedule_date) AS schedule_date, 
        'Pregnancy' AS schedule_type
    FROM patient p
    JOIN pregnant pr ON p.patient_id = pr.patient_id
    JOIN pregnant_schedule ps ON pr.pregnant_id = ps.pregnant_id
    WHERE DATE(ps.pregnant_schedule_date) = '$currentDate'
    
    UNION ALL
    
    SELECT 
        p.first_name, 
        p.last_name, 
        p.image, 
        DATE(ds.disease_schedule_date) AS schedule_date, 
        'Contagious Disease' AS schedule_type
    FROM patient p
    JOIN contagious_disease cd ON p.patient_id = cd.patient_id
    JOIN disease_schedule ds ON cd.disease_id = ds.disease_id
    WHERE DATE(ds.disease_schedule_date) = '$currentDate'
    
    UNION ALL
    
    SELECT 
        p.first_name, 
        p.last_name, 
        p.image, 
        DATE(isch.immunization_schedule_date) AS schedule_date, 
        'Immunization' AS schedule_type
    FROM patient p
    JOIN immunization im ON p.patient_id = im.patient_id
    JOIN immunization_schedule isch ON im.immunization_id = isch.immunization_id
    WHERE DATE(isch.immunization_schedule_date) = '$currentDate'
";

// Execute the query
$result = $conn->query($sql);

$response = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $response[] = [
            'first_name' => $row['first_name'],
            'last_name' => $row['last_name'],
            'image' => $row['image'],
            'schedule_date' => $row['schedule_date'],
            'schedule_type' => $row['schedule_type']
        ];
    }
} else {
    $response['message'] = "No data found for today's date.";
}

header('Content-Type: application/json');
echo json_encode($response);

$conn->close();

?>
