jQuery(function($) {
		
	//Validator
	//$("#commentform").validate({
	//	errorLabelContainer: $("#commentform div.error")
	//});
	
	//In Field Labels
	//$("label").inFieldLabels();

	//Fancybox
	$("a[rel^=fancybox], a[href$=jpg], a[href*=jpeg], a[href*=png]").fancybox({
		//'transitionIn'		: 'none',
		//'transitionOut'		: 'none',
		'titleShow'			: false
		//'titlePosition' 	: 'over',
		//'titleFormat'		: function(title, currentArray, currentIndex, currentOpts) {
		//	return '<span id="fancybox-title-over">Image ' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</span>';
		//}
	});
	
	//Grab first character for Drop Caps
	$("#entry p:eq(0)").each(function() {
		var text = $(this).html();
		var first = $(this).html(text.replace(/^([A-Za-z0-9])/g,'<span class="dropped">$1</span>'));
	});
	
	$('li.depth-1:has(ul.children)').addClass('conversation');
	
	$("blockquote").each(function(){
		var text = $(this).html();
		var bq = $("<span class='oversized-quote'>&ldquo;</span>");
		$(this).html(text).prepend(bq);
	});
	   
	//Gradient On li's that have a class of children
	//var ListWithChildren = $("li.comment:has(ul)");
	//ListWithChildren.addClass('greyNest');
	
	$("img").lazyload({         
     effect : "fadeIn"
	});
	
	/*
	$('#comment').autoResize({
	    // On resize:
	    onResize : function() {
	        $(this).css({opacity:0.8});
	    },
	    // After resize:
	    animateCallback : function() {
	        $(this).css({opacity:1});
	    },
	    // Quite slow animation:
	    animateDuration : 300,
	    // More extra space:
	    extraSpace : 0
	});
	*/
	
	$('textarea').expandable();

});