Database2 = (function(App, $, _) {

	var Module = App.Module({
		name: "Database2",
		description: "",
		author: "Fabian Tollenaar (c) Starting Point",
		version: "0.1"
	});

	Module.config = _.extend(Module.config, {
		datadir: '/data'
	});
	
	Module.data 	 		= {};
	Module.data.index 	 	= {};
	Module.data.locations 	= {};
	
	Module.load = function(cb) {
		try {
			Module.data.index = window._data;
			window._data = {};
			window._data = null;
			delete window._data;
			
			cb(null);
		} catch(e) {
			cb(e);
		}
	}

	Module.init = function(config) {
		Module.config = _.extend(Module.config, config);
		Module._bootstrap();
		
		Module.load(function(err) {
			if(!err) {
				Module.data.locations = Module.data.index.locations;
				Module.data.index.locations = {};
				
				setTimeout(function() {
					Module.config.ready(null, Module.data);
				}, 500);
			} else {
				Module.config.ready(err);
			}
		});
	};

	return Module;

})(App, jQuery, _);