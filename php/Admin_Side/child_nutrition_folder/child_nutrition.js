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
        url: 'child_nutrition_load.php',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            var tableBody = $('.table-container #staff-table tbody');
            var templateRow = $('#template-row').clone().removeAttr('id').removeAttr('style');
            console.log(data);
            tableBody.empty();
            $.each(data, function(index, row) {
                var newRow = templateRow.clone();
                newRow.find('.id').text(row.child_id);
                newRow.find('.name').text(row.first_name + " " + row.last_name);  
                newRow.find('.position').text(row.child_status);
                newRow.find('.contact_number').text(row.guardian);
                newRow.find('.actions').html('<button class="edit-btn" data-id="' + row.child_id + '"><img src="../assets/mdi_eye.png" alt=""></button> <button class="delete-btn" data-id="' + row.child_id + '">  <img src="../assets/Vector-1.png" alt=""> </button>');
                tableBody.append(newRow);
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error loading data: ' + textStatus, errorThrown);
        }
    });


    

//edit modal
$(document).on('click', '.edit-btn', function() {
    var id = $(this).data('id');
    
    $.ajax({
        url: 'child_fetch.php',
        type: 'GET',
        data: { id: id },
        success: function(response) {
            try {
                var patient = JSON.parse(response);
                $('#edit-patient_id').val(patient.referral_id);
                $('#edit-first_name').val(patient.first_name + ' ' + patient.last_name);
                $('#description').val(patient.child_status);
                $('#weight').val(patient.weight);
                $('#height').val(patient.height);
                $('#blood_pressure').val(patient.blood_pressure); 
                $('#heart_rate').val(patient.heart_rate); 
                $('#temperature').val(patient.temperature);
                $('#guardian').val(patient.guardian); 
                $('#guardian_contact').val(patient.guardian_contact); 
                
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








}
