Chrome = (function(App, $, _, Backbone) {

	var Module = App.Module({
		name: "Chrome",
		description: "",
		author: "Fabian Tollenaar (c) Starting Point",
		version: "0.1"
	});
	
	Module.Background = null;
	Module.elements = {};

	Module.config = _.extend(Module.config, {
		timeline: '#chrome_timeline',
		home: '#chrome_btn_home',
		play: '#chrome_btn_play',
		title: '#chrome_title',
		background: 'body',
		title_h1: '.title',
		title_sub: '.subTitle',
		content: '#chrome_content'
	});
	
	Module.addTime = function(year, obj) {
		// <a href="#" class="uitime"> <p>18<span>76</span></p> </a>
		var yr = year.split('');
		var x = yr[0] + yr[1];
		var y = '<span>' + yr[2] + yr[3] + '</span>';
		
		var a = $('<a></a>').attr({ 
			'href': '#',
			'data-year': year
		}).addClass('uitime').html('<p>' + x + y + '</p>');
		
		a.bind('click', function() {
			Module.trigger('timeline_press', { year: year, data: obj, $el: a });
			return false;
		});
		
		Module.elements.timeline.append(a);
	}
	
	Module.set = function(args) {
		if(typeof args !== 'object') return;
		
		if(typeof args.background === 'string') {
			Module.Background.changeImage(args.background);
		}
		
		if(typeof args.title === 'string') {
			Module.elements.title.empty().html(args.title);
		}
		
		if(typeof args.subtitle === 'string') {
			Module.elements.subtitle.empty().html('<h2>' + args.subtitle + '</h2>');
		}
		
		if(typeof args.timeline === 'object') {
			Module.elements.timeline.empty();
			
			for(var i in args.timeline) {
				Module.addTime(args.timeline[i].year, args.timeline[i]);
			}
		}
	}
	
	Module.hide = function(_speed) {
		var speed = _speed || 0;
		
		for(var n in Module.elements) {
			if(speed > 0) {
				Module.elements[n].fadeOut(speed);
			} else {
				Module.elements[n].hide();
			}
		}
	}
	
	Module.show = function(_speed) {
		var speed = _speed || 0;
		
		for(var n in Module.elements) {
			if(speed > 0) {
				Module.elements[n].fadeIn(speed);
			} else {
				Module.elements[n].show(speed);
			}
		}
	}

	Module.init = function(config) {
		Module.config = _.extend(Module.config, config);
		Module.Background = App.getModule('Background');
		
		Module.elements = {
			content_con:$(Module.config.content),
			title_con: 	$(Module.config.title),
			title: 		$(Module.config.title).find(Module.config.title_h1),
			subtitle: 	$(Module.config.title).find(Module.config.title_sub),
			timeline: 	$(Module.config.timeline),
			play: 		$(Module.config.play),
			home: 		$(Module.config.home)
		}
		
		Module.elements.play.bind('click', function() {
			Module.trigger('btn_press', { button: 'play', $el: Module.elements.play });
			return false;
		});
		
		Module.elements.home.bind('click', function() {
			Module.trigger('btn_press', { button: 'home', $el: Module.elements.home });
			return false;
		});
		
		Module.hide(0);
	};

	return Module;

})(App, jQuery, _, Backbone);