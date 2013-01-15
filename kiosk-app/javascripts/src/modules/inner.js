Inner = (function(App, $, _) {

	var Module = App.Module({
		name: "Inner",
		description: "",
		author: "Fabian Tollenaar (c) Starting Point",
		version: "0.1"
	});
	
	Module.config = _.extend(Module.config, {
		margin: 30,
		mdebug: false
	});
	
	Module.inner  = null;
	Module.parent = null;
	
	Module.resize = function() {
		var w, h, o;
		
		o = Module.config.margin * 2;
		w = Module.parent.width();
		h = Module.parent.height();
		
		Module.inner.css({
			margin: Module.config.margin + 'px',
			width: (w - o) + 'px',
			height: (h - o) + 'px'
		});
	}

	Module.init = function(config) {
		Module.config = _.extend(Module.config, config);
		Module.inner  = $(Module.config.inner);
		Module.parent = Module.inner.parent('.canvas');
		
		var lazy = _.debounce(function() { return Module.resize(); }, 300);
		$(window).resize(lazy);
		Module.resize();
		
		if(Module.config.mdebug === true) {
			Module.inner.css('background-color', 'blue');
		}
	};

	return Module;

})(App, jQuery, _);