
$(document).ready(function(){
    loadRef(); // Call the function when the page loads
    loadPreg();
    loadChild();
    loadDis();
    loadIm();
    loadRefStat(); // Call the function when the page loads
    loadPregStat();
    loadChildStat();
    loadDisStat();
    loadImStat();
    loadTotal();
    loadTotalStats();

});

function loadRef() {
    $.ajax({    
        url: "dashboard_php/countReferrals.php", // The PHP file that processes the request
        method: "GET", // Use GET request
        success: function(response) {
            // Update the HTML element with the response (row count)
            $("#ref-count").html(response);
        }
    });
}

function loadRefStat() {
    $.ajax({    
        url: "dashboard_php/statsReferrals.php", // The PHP file that processes the request
        method: "GET", // Use GET request
        success: function(response) {
            // Update the HTML element with the response (row count)
            $("#ref-per").html(response);
        }
    });
}

function loadPreg() {
    $.ajax({
        url: "dashboard_php/countPregnant.php", // The PHP file that processes the request
        method: "GET", // Use GET request
        success: function(response) {
            // Update the HTML element with the response (row count)
            $("#preg-count").html(response);
        }
    });
}

function loadPregStat() {
    $.ajax({
        url: "dashboard_php/statsPregnant.php", // The PHP file that processes the request
        method: "GET", // Use GET request
        success: function(response) {
            // Update the HTML element with the response (row count)
            $("#preg-per").html(response);
        }
    });
}

function loadChild() {
    $.ajax({
        url: "dashboard_php/countChildren.php", // The PHP file that processes the request
        method: "GET", // Use GET request
        success: function(response) {
            // Update the HTML element with the response (row count)
            $("#child-count").html(response);
        }
    });
}

function loadChildStat() {
    $.ajax({
        url: "dashboard_php/statsChildren.php", // The PHP file that processes the request
        method: "GET", // Use GET request
        success: function(response) {
            // Update the HTML element with the response (row count)
            $("#child-per").html(response);
        }
    });
}


function loadDis() {
    $.ajax({
        url: "dashboard_php/countDisease.php", // The PHP file that processes the request
        method: "GET", // Use GET request
        success: function(response) {
            // Update the HTML element with the response (row count)
            $("#dis-count").html(response);
        }
    });
}

function loadDisStat() {
    $.ajax({
        url: "dashboard_php/statsDisease.php", // The PHP file that processes the request
        method: "GET", // Use GET request
        success: function(response) {
            // Update the HTML element with the response (row count)
            $("#dis-per").html(response);
        }
    });
}

function loadIm() {
    $.ajax({
        url: "dashboard_php/countImmunization.php", // The PHP file that processes the request
        method: "GET", // Use GET request
        success: function(response) {
            // Update the HTML element with the response (row count)
            $("#Im-count").html(response);
        }
    });
}

function loadImStat() {
    $.ajax({
        url: "dashboard_php/statsImmunization.php", // The PHP file that processes the request
        method: "GET", // Use GET request
        success: function(response) {
            // Update the HTML element with the response (row count)
            $("#Im-per").html(response);
        }
    });
}


function loadTotal() {
    $.ajax({
        url: "dashboard_php/total.php", // The PHP file that processes the request
        method: "GET", // Use GET request
        success: function(response) {
            // Update the HTML element with the response (row count)
            $("#total-count").html(response);
        }
    });
}

function loadTotalStats() {
    $.ajax({
        url: "dashboard_php/total_stats.php", // The PHP file that processes the request
        method: "GET", // Use GET request
        success: function(response){
            // Update the HTML element with the response (row count)
            $("#total-percent").html(response);
        }
    });
}



































// Select modal and buttons
const modal = document.querySelector(".records-modal");
const openModalButton = document.querySelector(".generate-report");
const cancelModalButton = document.getElementById("closeRecordsModalBtn"); // Select the "Cancel" button

// Open modal when the "Generate Report" button is clicked
openModalButton.addEventListener("click", () => {
    modal.style.display = "flex"; // Show the modal with flex layout
});

// Close modal when the "Cancel" button is clicked
cancelModalButton.addEventListener("click", () => {
    modal.style.display = "none"; // Hide the modal
});


$(document).ready(function () {
    // Fetch records from the server
    $.ajax({
        url: 'records-table-backend.php', // Endpoint to fetch data
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // Clear existing rows
            $('#records-body').empty();

            // Populate rows with fetched data
            data.forEach(function (row) {
                const tableRow = `
                    <tr>
                        <td><strong>${row.category}</strong></td>
                        <td><strong>${row.count}</strong></td>
                    </tr>
                `;
                $('#records-body').append(tableRow);
            });
        },
        error: function (xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
});


document.getElementById('printTableBtn').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Get the table element
    const table = document.getElementById('healthcare-table');

    // Use jsPDF AutoTable to generate a table in the PDF
    doc.autoTable({
        html: table,
        startY: 20, // Top margin
        styles: { fontSize: 12, halign: 'center' }, // General styles
        headStyles: { fillColor: [0, 123, 255] }, // Table header styles
    });

    // Add a title
    doc.setFontSize(18);
    doc.text('Healthcare Records', 14, 15); // x: 14, y: 15

    // Save the PDF
    doc.save('Healthcare_Records.pdf');
});