$(document).ready(function() {

    loadTable();
    
    var savedFilter = localStorage.getItem('nameInput');
    if (savedFilter) {
        $('#filtername').val(savedFilter);
        performFilter(savedFilter);}
   
    // document.getElementById('filtername').value = 'Shadow';
});


function loadTable() {
    $.ajax({
        url: 'pregnant_load.php',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            var tableBody = $('.table-container #staff-table tbody');
            var templateRow = $('#template-row').clone().removeAttr('id').removeAttr('style');
            console.log(data);
            tableBody.empty();
            $.each(data, function(index, row) {
                var newRow = templateRow.clone();
                newRow.find('.id').text(row.pregnant_id);
                newRow.find('.name').text(row.first_name + " " + row.last_name);  
                newRow.find('.position').text(row.expected_due_date);
                newRow.find('.contact_number').text(row.pregnancy_status);
                newRow.find('.actions').html('<button class="edit-btn" data-id="' + row.pregnant_id + '"><img src="../assets/mdi_eye.png" alt=""></button> <button class="delete-btn" data-id="' + row.pregnant_id + '">  <img src="../assets/Vector-1.png" alt=""> </button>');
                tableBody.append(newRow);
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error loading data: ' + textStatus, errorThrown);
        }
    });
}



//edit modal
$(document).on('click', '.edit-btn', function() {
    var id = $(this).data('id');
    
    $.ajax({
        url: 'pregnant_fetch.php',
        type: 'GET',
        data: { id: id },
        success: function(response) {
            try {
                var patient = JSON.parse(response);
                $('#edit-patient_id').val(patient.pregnant_id_id);
                $('#edit-first_name').val(patient.first_name + ' ' + patient.last_name);
                $('#start_date').val(patient.start_date);
                $('#expected_due_date').val(patient.expected_due_date);
                $('#pregnancy_status').val(patient. pregnancy_status);
                $('#father').val(patient. father); 
                $('#father_contact').val(patient. father_contact); 

              
                
                // Show the modal, use the appropriate method depending on your modal implementation
                $('#edit-modal').show();

                $('#edit-modal').show();

                console.log("Boyaka");
            } catch (e) {
                alert('Error parsing staffs details.');
                console.log(response);
                console.log(id);

            }
        },
        error: function() {
            alert('php is to blame');
        }
    });
});


// Close modal
$('.close-edit').click(function() {
    $('#edit-modal').hide();
});

// Close modal when clicking outside
$(window).click(function(event) {
    if ($(event.target).is('#edit-modal')) {
        $('#edit-modal').hide();
    }
});








