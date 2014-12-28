jQuery(function($){
	//alert('Seriously its ready!');

	var site = function() {
		this.navLi = $('#menu-mainnav li').children('ul').hide().end();
		this.init();
	};

	site.prototype = {

	 	init : function() {
	 		this.setMenu();
	 	},

	 	// Enables the slidedown menu, and adds support for IE6

	 	setMenu : function() {
	 	/*
	 	//This adds those annoying separators to the top level lis
	 	$.each($('#menu-mainnav li'), function() {
	 		if ( $(this).children('ul')[0] ) {
	 			$(this)
	 				.append('<span />')
	 				.children('span')
	 					.addClass('hasChildren')
	 		}
	 	});
	 	*/
	 		this.navLi.hover(function() {
	 			// mouseover
	 			$(this).find('> ul').stop(true, true).show();
	 		}, function() {
	 			// mouseout
	 			$(this).find('> ul').stop(true, true).hide(); 		});

	 	}

	};

	new site();

});
