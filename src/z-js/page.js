jQuery(function($) {

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
	/*
	$("div.entry p:eq(0)").each(function() {
		var text = $(this).html();
		var first = $('<span>'+text.charAt(0)+'</span>').addClass('dropcap');
		$(this).html(text.substring(1)).prepend(first);
	});

	$("blockquote").each(function(){
		var text = $(this).html();
		var bq = $("<span class='bq'>&ldquo;</span>");
		$(this).html(text).prepend(bq);
	});
	*/

	//Gradient On li's that have a class of children
	//var ListWithChildren = $("li.comment:has(ul)");
	//ListWithChildren.addClass('greyNest');

	$("img").lazyload({
     effect : "fadeIn"
	});

	if ($("#aTitle").length !== 0 || $("#contactInfo").length < 0) {
		$("#announcements").removeClass('hide').addClass('show');
		$("div.entry").css({
			'float' : 'left',
			'margin-left' : '0',
			'margin-right' : '15px'
			});
	}

});
