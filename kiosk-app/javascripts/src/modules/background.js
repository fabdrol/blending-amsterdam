Background = (function(App, $, _) {

	var Module = App.Module({
		name: "Background",
		author: "Fabian Tollenaar (c) Starting Point",
		version: "0.2"
	});

	// Module.config = _.extend(Module.config, { });

	Module.resize = function(config) {
		var config  = Module.config;
		var img 	= Module.url;

		if(body.find('div.main-bg').length <= 0) {
			var bg = $('<div></div>').prependTo('body').addClass('main-bg');
		} else {
			var bg = $('body').find('div.main-bg');
		}

		if(bg.find('.background-img').length <= 0) {
			var div = $('<div></div>').addClass('background-img').appendTo(bg);
		} else {
			var div = bg.find('.background-img');
		}

		var im 	= $('<img />').appendTo('body').hide();
		var iw, ih, w, h, r, l, t;

		im.bind('load', function() {
			iw = im.width();
			ih = im.height();

			w = $(window).width();
			r = ih / iw;
			h = Math.ceil(w * r);

			if(h < $(window).height()) {
				r = iw / ih;
				h = $(window).height();
				w = Math.ceil(h * r);
			}

			if(w > $(window).width()) {
				var l = (0 - Math.floor((w - $(window).width()) / 2));
			}

			if(h > $(window).height()) {
				var t = (0 - Math.floor((h - $(window).height()) / 2));
			}

			div.css({
				'width': w + 'px',
				'height': h + 'px',
				'top': t + 'px',
				'left': l + 'px',
				'background-image': 'url(' + img + ')'
			});

			im.remove();
		});

		im.attr('src', img);
	}
	
	Module.support = false;
	Module.url = '';
	
	Module.changeImage = function(url) {
		Module.url = url;
		$('body').attr('data-background', Module.url);
		
		if(Module.support === true) {
			$('body').css('background-image', 'url(' + Module.url + ')');
		} else {
			var lazy = _.debounce(function() { return Module.resize(); }, 300);
			$(window).resize(lazy);
			Module.resize();
		}
	}

	Module.init = function(config) {
		Module.config 	= _.extend(Module.config, config);
		Module.url 		= $('body').attr('data-background');

		Modernizr.addTest('backgroundsize', function() {
			Module.support = true;
		});

		if(Module.support === true) {
			var body = $('body');

			body.addClass('main-bg');
			body.css('background-image', 'url(' + Module.url + ')');
		} else {
			var lazy = _.debounce(function() { return Module.resize(); }, 300);
			$(window).resize(lazy);
			Module.resize();
		}
	};

	return Module;

})(App, jQuery, _);