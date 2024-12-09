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
        url: 'patient_load.php',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            var tableBody = $('.table-container #staff-table tbody');
            var templateRow = $('#template-row').clone().removeAttr('id').removeAttr('style');
            console.log(data);
            tableBody.empty();
            $.each(data, function(index, row) {
                var newRow = templateRow.clone();
                newRow.find('.id').text(row.patient_id);
                newRow.find('.name').text(row.first_name + " " + row.last_name);  
                newRow.find('.position').text(row.purok);
                newRow.find('.contact_number').text(row.contact_number);
                newRow.find('.actions').html('<button class="edit-btn" data-id="' + row.patient_id + '">Select</button>');
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


// Add Immunization
$('#Immunization_Add-form').submit(function(event) {
    event.preventDefault();

    var formData = $(this).serialize();
    console.log(formData);

    $.ajax({
        url: 'patient_add.php',
        method: 'POST',
        data: formData,
        dataType: 'json',
        success: function(response) {
            console.log('Character added successfully: ', response);
            $('#add-modal').hide();
            // localStorage.setItem('nameInput','');
            // document.getElementById('filtername').value = "";
          window.location.href = 'immunization.html';
            
            // loadTable();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error adding character: ', textStatus, errorThrown);
          
            location.reload();
            alert('Failed to add character, please try againsss.');
            window.location.href = 'immunization.html';
        }
    });
});




// Add character
$('#addForm').submit(function(event) {
    event.preventDefault();

    var formData = $(this).serialize();
    console.log(formData);

    $.ajax({
        url: 'patient_add.php',
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


$('#staff-table').on('click', '.delete-btn', function() {
    if (!confirm('Are you sure you want to delete this Staff Member?')) {
        return;
    }

    var id = $(this).data('id');

    $.ajax({
        url: 'patient_delete.php',
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


//edit modal
$(document).on('click', '.edit-btn', function() {
    var id = $(this).data('id');
    
    $.ajax({
        url: 'patient_fetch.php',
        type: 'GET',
        data: { id: id },
        success: function(response) {
            try {
                var patient = JSON.parse(response);
                $('#edit-patient_id').val(patient.patient_id);
                $('#edit-first_name').val(patient.first_name + ' '+patient.last_name);
                $('#edit-middle_name').val(patient.middle_name);
                $('#edit-last_name').val(patient.last_name);
                $('#edit-gender').val(patient.gender);
                $('#edit-purok').val(patient.purok);
                $('#edit-household').val(patient.household);
                $('#edit-civil_status').val(patient.civil_status);
                $('#edit-age').val(patient.age);
                $('#edit-contact').val(patient.contact_number);
                $('#edit-blood_type').val(patient.blood_type);
                
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


// Edit character
$('#edit-form').submit(function(e) {
    e.preventDefault();
    var patient_id = $('#edit-patient_id').val();
    var first_name = $('#edit-first_name').val();
    var middle_name = $('#edit-middle_name').val();
    var last_name = $('#edit-last_name').val();
    var gender = $('#edit-gender').val();
    var purok = $('#edit-purok').val();
    var household = $('#edit-household').val();
    var civil_status = $('#edit-civil_status').val();
    var age = $('#edit-age').val();
    var contact_number = $('#edit-contact_number').val();
    var blood_type = $('#edit-blood_type').val();    

    $.ajax({
        url: 'patient_edit.php',
        type: 'POST',
        data: { patient_id: patient_id,
                first_name: first_name,
                middle_name: middle_name,
                last_name:last_name,
                gender:gender,
                purok:purok,
                household:household,
                civil_status:civil_status,
                age:age,
                contact_number:contact_number,
                blood_type:blood_type
         },
        success: function(response) {
            alert('Character updated successfully JS!');
            $('#edit-modal').hide();
            // loadTable(); 
            location.reload();
        },
        error: function() {
            console.log(response);
            alert('Error updating character.');
        }
    });
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
//filter

  
$(document).ready(function() {
    // Load the filter value from localStorage when the page loads
    var savedFilter = localStorage.getItem('nameInput');

    if (savedFilter) {
        $('#filtername').val(savedFilter);
        performFilter(savedFilter); // Perform filter if saved value exists
    }

    $("#filter-btn").on('click', function() {
        var nameInput = $('#filtername').val().trim(); // Get the trimmed input value
        localStorage.setItem('nameInput', nameInput);

        // Console logs for debugging
        console.log("Name input:", nameInput);

        // If nameInput is empty, reload the page
        if (nameInput === "") {
            console.log("Table empty, reloading page");
            setTimeout(function() {
                location.reload();
            }, 5000); // Reload after 5 seconds
            return;
        }
        // Perform AJAX request with the filter data
        // performFilter(nameInput);
    });
});

function performFilter(nameInput) {
    $.ajax({
        url: 'patient_filter.php',
        method: 'POST',
        data: { name: nameInput }, // Send data as key-value pairs
        dataType: 'json',
        success: function(data) {
            console.log("AJAX success, data received:", data); // Debug statement
            var tableBody = $('.table-container #staff-table tbody');
            tableBody.empty();

            // Check if data is an array and has content
            if (Array.isArray(data)) {
                $.each(data, function(index, row) {
                    console.log("Processing row:", row); // Debug each row
                    var newRow = $('<tr class="table_tr"></tr>');
                    newRow.append('<td>' + row.patient_id + '</td>');
                    newRow.append('<td>' + row.first_name + " " + row.last_name + '</td>');
                    newRow.append('<td>' + row.purok + '</td>');
                    newRow.append('<td>' + row.contact_number + '</td>');
                    newRow.append('<button class="edit-btn" data-id="' + row.patient_id + '">Select</button>');
                    tableBody.append(newRow);
                    // document.getElementById('filtername').value = '';  
                });
            } else {
                console.error('Unexpected data format or empty data:', data);
                // tableBody.append('<tr><td colspan="5">No results found</td></tr>');
            }

            $('#filtername').val('');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error loading data: ' + textStatus, errorThrown);
        }
    });
}



//role select

$(document).ready(function(){
    $('#roleSelect').on('change',function(){
        var  filterValue = $(this).val();

        $.ajax({
            url: 'patient_purok.php',
            type:'POST',
            data:{filter: filterValue},
            success: function(data){
                console.log("AJAX success, data received:", data); // Debug statement
                var tableBody = $('.table-container #staff-table tbody');
                tableBody.empty();
                // Check if data is an array and has content
                if (Array.isArray(data)) {
                    $.each(data, function(index, row) {
                        console.log("Processing row:", row); // Debug each row
                        var newRow = $('<tr class="table_tr"></tr>');
                        newRow.append('<td>' + row.patient_id + '</td>');
                        newRow.append('<td>' + row.first_name + " " + row.last_name + '</td>');
                        newRow.append('<td>' + row.purok + '</td>');
                        newRow.append('<td>' + row.contact_number + '</td>');
                        newRow.append('<button class="edit-btn" data-id="' + row.patient_id + '"><img src="../assets/mdi_eye.png" alt=""></button> <button class="delete-btn" data-id="' + row.patient_id + '">  <img src="../assets/Vector-1.png" alt=""> </button>');
                        tableBody.append(newRow);
                       
                        // document.getElementById('filtername').value = '';  
                    });
                } else {
                    console.error('Unexpected data format or empty data:', data);
                    // tableBody.append('<tr><td colspan="5">No results found</td></tr>');
                }
              

            },
            error: function(){
                alert('Error Filtering data');
            }
        })
    })
}

);

$('#clear').click(function(){
    localStorage.setItem('nameInput','');
    document.getElementById('filtername').value = "";
    location.reload().
    console.log('hello');
}
) 