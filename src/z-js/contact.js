jQuery(function ($) {
	var submitURL = '/wp-content/themes/playground/submit.php';
	var errorMsg = $('#response');
	var contactForm = $('#contactForm');

	$('#submit').live('click',function(){
		var button = $(this);

		var firstname = $('#firstname').val();
		var lastname = $('#lastname').val();
		var emailFrom = $('#emailFrom').val();
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		var comment	= $('#comment').val();
		var emailRoute = $('#mailbox input:radio:checked').val();
		var honeypot = $('#jerkNet').val();
		var hasError = false;

		// We use the working class not only for styling the submit button,
		// but also as kind of a "lock" to prevent multiple submissions.

		if(firstname.length < 1 ){
			errorMsg.html('<p>Please enter your First Name :)</p>');
			hasError = true;
		} else

		if (lastname.length < 1 ){
			errorMsg.html('<p>Please enter your Last Name :)</p>');
			hasError = true;
		} else

		if (!emailReg.test(emailFrom) || emailFrom.length === 0){
			errorMsg.html('<p>Please a correct E-mail address :)</p>');
			hasError = true;
		} else

		if (comment.length < 5 ){
			errorMsg.html('<p>Please enter a comment :)</p>');
			hasError = true;
		} else

		if (! $('#mailbox input').is(':checked')){
			errorMsg.html('<p>You must select a mailbox :)</p>');
			hasError = true;
		} else

		if (honeypot.length !== 0){
			hasError = true;

		}

		if (!hasError) {
			// Locking the form and changing the button style:
			button.addClass('working');

			$.ajax({
				url		: submitURL,
				type	: 'post',
				data	: { firstname : firstname,
							lastname  : lastname,
							emailFrom : emailFrom,
							comment	  : comment,
							emailRoute: emailRoute
						},
				complete	: function (xhr){

					var text = xhr.responseText;

					// This will help users troubleshoot their form:
					if (xhr.status === 404){
						text = 'Your path to submit.php is incorrect.';
					}

					// Hiding the button and the textarea, after which
					// we are showing the received response from submit.php

					button.fadeOut();

					$('fieldset').fadeOut(function(){
						contactForm.html('<div class="h1"><span>' + firstname + ',</span><br/> Your message has been sent. <br/>We will respond shortly :)</div>');
					});
				}
			});
		}
		return false;
	});

    $('#gMap').googleMaps({
        latitude: 38.654836,
        longitude: -90.296414,
        depth: 13,

        markers: [{
        		//RAC
                latitude: 38.654836,
                longitude: -90.296414,
	            info: {
	                layer: '#RAC',
	                popup: false
	            }

        },{
        		//MoonRise
                latitude: 38.655135,
                longitude: -90.296164,
	            info: {
	                layer: '#MOON',
	                popup: false
	            }
        }]

    });

    $('textarea').expandable();
	$('label.inField').inFieldLabels();
});
