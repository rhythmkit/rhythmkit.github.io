jQuery(function($){
    $("#twitter").getTwitter({
		userName: "812studio",
		numTweets: 1,
		loaderText: "Loading tweets...",
		slideIn: true,
		showHeading: false,
		headingText: "Latest Tweets",
		showProfileLink: true
	});
});