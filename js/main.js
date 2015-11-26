$(window).load(function() {
	var device = "desktop";
	$('.tab_nav ul a').click(function() {
	
		if (device == "desktop") {
			var selectedMenu = $(this),
				menu = $(".tab_nav ul");
			section = selectedMenu.attr('href');
			menu.children().removeClass('active');
			selectedMenu.parent().addClass('active');
			$('article').hide();
			$(section).fadeIn('slow', function(){
			   menu.addClass('active');
			});
		} else if (device="mobile"){
			var selectedMenu = $(this),
				menu = $(".tab_nav ul");
				section = selectedMenu.attr('href');
			$('h1.tab_nav ').addClass('active').fadeOut('fast');
			menu.addClass('active').fadeOut('fast', function() {
				$('#contact_copy').hide();
				$(section).addClass('active').fadeIn('fast');
				$('.back').fadeIn('fast');
			});	
		}
	return false;	
	});
	
	$('.grid-images a').hover(
		//$(this).css("marginTop","200");
		function()
			{
				$(this).animate({marginTop: "-=200"}, 500);
			},
			function()
			{
				$(this).animate({marginTop: "+=200"}, 500);
			}
		);
	function doIt() { return false }
	var workstepani=1;
	$('#neo-logo').click(function(){
		$(this).animate({marginTop: "50"}, 500, function() {
			$('.step').hide();
			$("#work-step"+workstepani).fadeIn();
			workstepani=workstepani+1;
  });
		
	});
});