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
        url: 'referral_load.php',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            var tableBody = $('.table-container #staff-table tbody');
            var templateRow = $('#template-row').clone().removeAttr('id').removeAttr('style');
            console.log(data);
            tableBody.empty();
            $.each(data, function(index, row) {
                var newRow = templateRow.clone();
                newRow.find('.id').text(row.referral_id);
                newRow.find('.name').text(row.first_name + " " + row.last_name);  
                newRow.find('.position').text(row.referral_date);
                newRow.find('.contact_number').text(row.approval_status);
                newRow.find('.actions').html('<button class="edit-btn" data-id="' + row.referral_id + '"><img src="../assets/mdi_eye.png" alt=""></button> <button class="delete-btn" data-id="' + row.referral_id + '">  <img src="../assets/Vector-1.png" alt=""> </button>');
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
        url: 'referral_fetch.php',
        type: 'GET',
        data: { id: id },
        success: function(response) {
            try {
                var patient = JSON.parse(response);
                $('#edit-patient_id').val(patient.referral_id);
                $('#edit-first_name').val(patient.first_name + ' ' + patient.last_name);
                $('#description').val(patient.description);
                $('#approval_status').val(patient.approval_status);
                $('#referral_date').val(patient. referral_date); 
              
                
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


$('#staff-table').on('click', '.delete-btn', function() {
    if (!confirm('Are you sure you want to delete this Staff Member?')) {
        return;
    }

    var id = $(this).data('id');

    $.ajax({
        url: 'referral_delete.php',
        method: 'POST',
        data: { id: id },
        dataType: 'json',
        success: function(response) {
            console.log('Character deleted successfully:', response);
         
            location.reload();
            // loadTable(); // Reload the table to remove the deleted character
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error deleting character:', textStatus, errorThrown);
            alert('Failed to delete character. Please try again.');
        }
    });
});

document.getElementById('allow-edit').addEventListener('click', function() {
    // Get all input elements and the submit button
    var inputs = document.querySelectorAll('#referral_Add-form input');
    var submitButton = document.getElementById('save-changes');
    // Check the current state (enabled or disabled) of the first input field
    var isDisabled = inputs[0].disabled;
    // Toggle the disabled state for all inputs and the submit button
    inputs.forEach(function(input){
      input.disabled = !isDisabled;
    }
);
    submitButton.disabled = !isDisabled;
  });







 










