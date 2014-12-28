jQuery(function($){
	//alert('Seriously its ready!');
	
	var keys 	= [];
	var baselineOn  = '38,38';
	var baselineOff  = '40,40';
		
	$(document).keydown(function(e){ 
		keys.push( e.keyCode );
			if ( keys.toString().indexOf( baselineOn ) >= 0 ){
			// Add actions here 
			
			$("body").addClass("baseline");
						
			keys = [];
		}
	});
	
	$(document).keydown(function(e){ 
		keys.push( e.keyCode );
			if ( keys.toString().indexOf( baselineOff ) >= 0 ){
			// Add actions here 
			
			$("body").removeClass("baseline");
			
			keys = [];
		}
	});

});