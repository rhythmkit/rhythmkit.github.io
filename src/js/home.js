jQuery(function($){
	$("#featureFader").faded({
		speed: 500,
		crossfade: true,
		bigtarget: false,
		sequentialloading: true,
		loadingimg: "loader.gif",
		autoplay: 5000,
		autorestart: 5000,
		random: false,
		autopagination:true
	});
	
	$(".tweet").tweet({
            username: ["SEGL"],
            join_text: "auto",
            //list: "SEGL",
            //avatar_size: 32,
            count: 1,
            auto_join_text_default: "SEGL said,",
            auto_join_text_ed: "SEGL",
            auto_join_text_ing: "SEGL was",
            auto_join_text_reply: "SEGL replied to",
            auto_join_text_url: "SEGL was checking out",
            loading_text: "loading tweets..."
        });

});
