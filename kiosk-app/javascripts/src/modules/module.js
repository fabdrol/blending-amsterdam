ModuleName = (function(App, $, _) {

	var Module = App.Module({
		name: "ModuleName",
		description: "",
		author: "Fabian Tollenaar (c) Starting Point",
		version: "0.1"
	});

	Module.config = _.extend(Module.config, {
		// Add defaults
	});

	Module.init = function(config) {
		// Add/override config on instantiation 
		Module.config = _.extend(Module.config, config);

		// Init the module
		// Do stuff.
	};

	return Module;

})(App, jQuery, _);