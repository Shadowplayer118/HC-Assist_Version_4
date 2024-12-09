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
        url: 'medicine_load.php',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            var tableBody = $('.table-container #staff-table tbody');
            var templateRow = $('#template-row').clone().removeAttr('id').removeAttr('style');
            console.log(data);
            tableBody.empty();
            $.each(data, function(index, row) {
                var newRow = templateRow.clone();
                newRow.find('.id').text(row.inventory_id);
                newRow.find('.name').text(row.item_name);  
                newRow.find('.position').text(row.brand);
                newRow.find('.contact_number').text(row.stock);
                newRow.find('.actions').html('<button class="edit-btn" data-id="' + row.inventory_id + '"><img src="../assets/mdi_eye.png" alt=""></button> <button class="delete-btn" data-id="' + row.inventory_id + '">  <img src="../assets/Vector-1.png" alt=""> </button>');
                tableBody.append(newRow);
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error loading data: ' + textStatus, errorThrown);
        }
    });
}



// Open modal
$('#openModalBtn').click(function() {
    $('#add-modal').show();
});

// Close modal
$('.close').click(function() {
    $('#add-modal').hide();
});

// Close modal when clicking outside
$(window).click(function(event) {
    if ($(event.target).is('#add-modal')) {
        $('#add-modal').hide();
    }
});


// Add character
$('#addForm').submit(function(event) {
    event.preventDefault();

    var formData = $(this).serialize();
    console.log(formData);

    $.ajax({
        url: 'medicine_add.php',
        method: 'POST',
        data: formData,
        dataType: 'json',
        success: function(response) {
            console.log('Character added successfully: ', response);
            $('#add-modal').hide();
            // localStorage.setItem('nameInput','');
            // document.getElementById('filtername').value = "";
          
            location.reload();
            // loadTable();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error adding character: ', textStatus, errorThrown);
            location.reload();
            alert('Failed to add character, please try again.');
        }
    });
});






//edit modal
$(document).on('click', '.edit-btn', function() {
    var id = $(this).data('id');
    
    $.ajax({
        url: 'medicine_fetch.php',
        type: 'GET',
        data: { id: id },
        success: function(response) {
            try {
                var med = JSON.parse(response);
                $('#edit-staff_id').val(med.inventory_id);
                $('#edit-item_name').val(med.item_name);
                $('#edit-brand').val(med.brand);
                $('#edit-category').val(med.category);
                $('#edit-stock').val(med.stock);
                $('#edit-price').val(med.price);

                // Show the modal, use the appropriate method depending on your modal implementation
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


document.getElementById('allow-edit').addEventListener('click', function() {
    // Get all input elements and the submit button
    var inputs = document.querySelectorAll('#edit-form input');
    var submitButton = document.getElementById('save-changes');
  
    // Check the current state (enabled or disabled) of the first input field
    var isDisabled = inputs[0].disabled;
  
    // Toggle the disabled state for all inputs and the submit button
    inputs.forEach(function(input) {
      input.disabled = !isDisabled;
    });
    submitButton.disabled = !isDisabled;
  });



  $('#staff-table').on('click', '.delete-btn', function() {
    if (!confirm('Are you sure you want to delete this Staff Member?')) {
        return;
    }

    var id = $(this).data('id');

    $.ajax({
        url: 'medicine_delete.php',
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
