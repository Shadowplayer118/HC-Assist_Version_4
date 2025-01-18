<?php

include '../../connection.php';

// Allow cross-origin requests (for development purposes)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get filter from the query string
$filter = isset($_GET['filter']) ? $_GET['filter'] : 'Purok';

// Initialize the query based on the filter
switch ($filter) {
    case 'Disease':
        $sql = "SELECT purok, COUNT(*) AS count 
                FROM patient 
                INNER JOIN contagious_disease 
                ON patient.patient_id = contagious_disease.patient_id 
                GROUP BY purok";
        break;

    case 'Pregnant':
        $sql = "SELECT purok, COUNT(*) AS count 
                FROM patient 
                INNER JOIN pregnant 
                ON patient.patient_id = pregnant.patient_id 
                GROUP BY purok";
        break;

    case 'Children':
        $sql = "SELECT purok, COUNT(*) AS count 
                FROM patient 
                WHERE age < 18 
                GROUP BY purok";
        break;

    case 'Senior':
        $sql = "SELECT purok, COUNT(*) AS count 
                FROM patient 
                WHERE age > 65 
                GROUP BY purok";
        break;

    default:
        $sql = "SELECT purok, COUNT(*) AS count 
                FROM patient 
                GROUP BY purok";
        break;
}

$result = $conn->query($sql);

$response = [];

// Fetch results
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $response[] = [
            'purok' => $row['purok'],
            'count' => (int)$row['count']
        ];
    }
} else {
    $response['error'] = "No data found.";
}

// Output the result as JSON
header('Content-Type: application/json');
echo json_encode($response);

// Close the connection
$conn->close();

?>
