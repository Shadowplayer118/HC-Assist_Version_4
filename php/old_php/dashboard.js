$('.profile').click(function() {
    $('.staff-profile').show();
});

$('.close').click(function() {
    $('.staff-profile').hide();
});


$(window).click(function(event) {
    if ($(event.target).is('.staff-profile')) {
        $('.staff-profile').hide();
    }
});




function gotoReferral(){

    window.location.href = "http://localhost/HC-Assist_Version1/referral.html";
}