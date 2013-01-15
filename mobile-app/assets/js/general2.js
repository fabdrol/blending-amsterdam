$(document).ready(function() {


	$('body').scrollTop(1);

	//blocks//
	$('.menu').click(function(){

		



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



	


 });

 $(window).load(function() {
 	setTimeout(function() {
 		$(window).scrollTop(1);
 	}, 100);
 });