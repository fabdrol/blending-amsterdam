(function($) {

	// timeline/muiderpoort.html

	$.points = [	
		{
			"id": 1,
			"x": 269,
			"y": 118,
			"name": "Central Station",
			"description": "Nullam id dolor id nibh ultricies vehicula ut id elit. Vestibulum id ligula porta felis euismod semper.",
			"url": "timeline/centraal-station.html"
		},
	
		{
			"id": 2,
			"x": 182,
			"y": 207,
			"name": "Dam Square",
			"description": "Nullam id dolor id nibh ultricies vehicula ut id elit. Vestibulum id ligula porta felis euismod semper.",
			"url": "timeline/dam.html"
		},
	
		{
			"id": 3,
			"x": 273,
			"y": 216,
			"name": "Nieuwmarkt",
			"description": "Nullam id dolor id nibh ultricies vehicula ut id elit. Vestibulum id ligula porta felis euismod semper.",
			"url": "timeline/waag.html"
		},
	
		{
			"id": 4,
			"x": 87,
			"y": 358,
			"name": "Leidse Square",
			"description": "Nullam id dolor id nibh ultricies vehicula ut id elit. Vestibulum id ligula porta felis euismod semper.",
			"url": "timeline/leidseplein.html"
		},
	
		{
			"id": 5,
			"x": 293,
			"y": 340,
			"name": "Hermitage Museum",
			"description": "Nullam id dolor id nibh ultricies vehicula ut id elit. Vestibulum id ligula porta felis euismod semper.",
			"url": "timeline/hermitage.html"
		},
	
		{
			"id": 6,
			"x": 402,
			"y": 317,
			"name": "Artis Royal Zoo",
			"description": "Nullam id dolor id nibh ultricies vehicula ut id elit. Vestibulum id ligula porta felis euismod semper.",
			"url": "timeline/artis.html"
		},
	
		{
			"id": 7,
			"x": 427,
			"y": 240,
			"name": "Maritime Museum",
			"description": "Nullam id dolor id nibh ultricies vehicula ut id elit. Vestibulum id ligula porta felis euismod semper."
		},
	
		{
			"id": 8,
			"x": 555,
			"y": 278,
			"name": "Funen Park",
			"description": "Nullam id dolor id nibh ultricies vehicula ut id elit. Vestibulum id ligula porta felis euismod semper.",
			"url": "timeline/funenpark.html"
		},
	
		{
			"id": 9,
			"x": 520,
			"y": 317,
			"name": "Brewery 't IJ",
			"description": "Nullam id dolor id nibh ultricies vehicula ut id elit. Vestibulum id ligula porta felis euismod semper.",
			"url": "timeline/brouwerij.html"
		},
	
		{
			"id": 10,
			"x": 309,
			"y": 390,
			"name": "Royal Theatre Carré",
			"description": "Nullam id dolor id nibh ultricies vehicula ut id elit. Vestibulum id ligula porta felis euismod semper.",
			"url": "timeline/carre.html"
		},
	
		{
			"id": 11,
			"x": 318,
			"y": 436,
			"name": "Amstel",
			"description": "Nullam id dolor id nibh ultricies vehicula ut id elit. Vestibulum id ligula porta felis euismod semper.",
			"url": "timeline/amstel.html"
		},
	
		{
			"id": 12,
			"x": 179,
			"y": 461,
			"name": "Heineken Experience",
			"description": "Nullam id dolor id nibh ultricies vehicula ut id elit. Vestibulum id ligula porta felis euismod semper.",
			"url": "timeline/heineken-experience.html"
		}
	];
		
	$.matrixToArray = function(matrix) {
	    return matrix.substr(7, matrix.length - 8).split(', ');
	}
	
	$.createOverlay = function(pin) {
		var desc = '';
		
		if(typeof pin.description === 'string') { 
			desc = '<p>' + pin.description + '</p>';
		}
		
		var overlay = $('<div></div>').addClass('ui-overlay').appendTo('body').hide();
		var dialog = $('<div></div>').addClass('ui-dialog').appendTo(overlay).html('<h1>' + pin.name + '</h1>' + desc);
		
		overlay.fadeIn(300);
		
		overlay.bind('click', function() {
			overlay.fadeOut(300, function() {
				overlay.remove();
			});
		});
		
		if(typeof pin.url === 'string') {
			dialog.bind('click', function() {
				window.location.href = pin.url;
			});
		}
	}
	
	$.createPins = function(after) {
		var create = function(pin) {
			// <a href="#" class="pin" data-coordinates="182,207"></a>
			var el = $('<a></a>');
			
			el.attr({
				'href': '#',
				'data-coordinates': pin.x + ',' + pin.y,
				'data-title': pin.name
			});
			
			el.addClass('pin');
			
			el.bind('click', function() {
				$.createOverlay(pin);
				return false;
			});
			
			el.insertAfter(after);
		};
		
		for(var i in $.points) {
			create($.points[i]);
		}
	}

	$.fn.pin = function() {
		return this.each(function() {
			var offsetX, offsetY, scale, x, y, coords, matrix, size, half;
			
			coords 	= $(this).attr('data-coordinates').split(',');
			matrix 	= $.matrixToArray($('#map2').css("-webkit-transform"));
			size 	= 30;
			half 	= size / 2;
			
			scale 	= parseFloat(matrix[3]);
			offsetX = parseFloat(matrix[4]);
			offsetY = parseFloat(matrix[5]);
			
			if(scale > 1) {
				size = size * scale;
				half = size / 2;
				
				$(this).width(size);
				$(this).height(size);
			
				x = ( ((parseInt(coords[0]) * scale) - half) + offsetX );
				y = ( ((parseInt(coords[1]) * scale) - half) + offsetY );
			} else {
				size = 30;
				half = size / 2;
				
				$(this).width(size);
				$(this).height(size);
				
				x = ( (parseInt(coords[0]) - half) + offsetX );
				y = ( (parseInt(coords[1]) - half) + offsetY );
			}
			
			$(this).css({
				left: x,
				top: y
			});
		});
	}

})(jQuery);

$(document).ready(function() {
	var viewport 	= $('.viewport');
	
	$.createPins(viewport);
	
	var scroll = new iScroll(viewport.get(0), {
		zoom: true,
		zoomMax: 3,
		vScrollbar: false,
		hScrollbar: false,
		bounce: false,
		momentum: false,
		
		onScrollEnd: function(evt) {
			$('.pin').pin();
		},
		
		onZoomEnd: function(evt) {
			$('.pin').pin();
		}
	});
	
	$('.pin').pin();
});

$(window).load(function() {
 	setTimeout(function() {
 		$(window).scrollTop(1);
 	}, 100);
 });