$(document).ready(function() {

	Flipsnap('.view', {
	    distance: 380
	});

	

	$('body').scrollTop(1);


	//blocks//
	$('.menu').click(function(){

		if($('.menu').hasClass('menu-activated')) {
			$('.menu').removeClass('menu-activated');
			$('.viewport').find('#overlayed-stuff').remove();
		} else {
			$('.menu').addClass('menu-activated');
			$('<div></div>').attr('id', 'overlayed-stuff').addClass('overlay').appendTo('.viewport');
		}


		$('.textBlock').toggle('slow');
		$('.imageBlock').toggle('slow');
		$('.playBlock').toggle('slow');

		$('.block').hide();
		$('.back').hide();
	});

	$('.view').click(function(){
		$('.textBlock').hide('slow');
		$('.imageBlock').hide('slow');
		$('.playBlock').hide('slow');
	});

	$('.textBlock').click(function(){
		$('.block').show('slow');
		$('.back').show(0);

		$('.textBlock').hide();
		$('.imageBlock').hide();
		$('.playBlock').hide();
	});

	$('.imageBlock').click(function(){
		$('.block').show('slow');
		$('.back').show(0);

		$('.textBlock').hide();
		$('.imageBlock').hide();
		$('.playBlock').hide();
	});

	$('.playBlock').click(function(){
		$('.block').show('slow');
		$('.back').show(0);

		$('.textBlock').hide();
		$('.imageBlock').hide();
		$('.playBlock').hide();
	});

	$('.back').click(function(){
		$(this).hide();

		$('.textBlock').show('slow');
		$('.imageBlock').show('slow');
		$('.playBlock').show('slow');

		$('.block').hide();
	});

	$('.view').scroll(function(){
		$('.textBlock').hide('slow');
		$('.imageBlock').hide('slow');
		$('.playBlock').hide('slow');

		$('.block').hide();
		$('.back').hide();
		console.log("iam scrolling they hatin");
	});



 });

 $(window).load(function() {
 	setTimeout(function() {
 		$(window).scrollTop(1);
 	}, 100);
 });