    <?php

    include '../../connection.php';

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    // Query to get the disease with the most entries where disease_status is not "CURED"

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }


    $sqlMostEntries = "
    SELECT disease_name, COUNT(*) AS disease_count
    FROM contagious_disease
    GROUP BY disease_name
    ORDER BY disease_count DESC
    LIMIT 1;
";

$resultMostEntries = $conn->query($sqlMostEntries);

if ($resultMostEntries->num_rows > 0) {
    // Fetch the result
    $row = $resultMostEntries->fetch_assoc();
    $diseaseName = $row['disease_name'];
    $diseaseCount = $row['disease_count'];
}


    // Get the total count of patients
    $sqlTotalPatients = "SELECT COUNT(*) AS total_patients FROM patient";
    $resultPatients = $conn->query($sqlTotalPatients);
    $rowPatients = $resultPatients->fetch_assoc();
    $totalPatients = $rowPatients['total_patients'];

    // Get the count of Cases cases that are not 'CURED'
    $sqlCasesCases = "
   SELECT COUNT(*) AS total_cases
    FROM contagious_disease
    WHERE disease_name = '$diseaseName' AND disease_status != 'CURED';

    ";
    $resultCases = $conn->query($sqlCasesCases);
    $rowCases = $resultCases->fetch_assoc();
    $totalCases = $rowCases['total_cases'];

    // Calculate the percentage
    $percentage = round(($totalCases / $totalPatients) * 100, 2);

    // Determine the status based on the percentage
    if ($percentage > 75) {
        echo $totalCases;
        echo $percentage;
        echo "danger";
    } elseif ($percentage > 50) {
        echo $totalCases;

        echo $percentage;
        echo "warning";
    } else {
       
        echo $totalPatients;
        echo $percentage;
        echo "Safe";
    }

    // Close connection
    $conn->close();

    ?>
