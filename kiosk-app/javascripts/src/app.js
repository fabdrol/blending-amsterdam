App = (function($, _, Bb) {

	var App = _.extend({}, Bb.Events);

	App.package = {
		name: "OpiniePlein CRM",
		author: "Fabian Tollenaar (c) Starting Point",
		version: "0.1"
	};

	App.initializers = [];
	App.modules 	 = {};
	App.config 		 = { debug: false };
	App.started 	 = false;

	App.log = function(msg, _level) {
		if(App.config.debug === true) {
			if(_level === "log" || _level === "info" || _level === "debug" || _level === "error") {
				var level = _level;
			} else {
				var level = "log";
			}

			if(typeof window.console !== 'undefined') {
				switch(level) {
					case 'log': console.log(msg); break;
					case 'info': console.info(msg); break;
					case 'debug': console.warn(msg); break;
					// case 'error': throw new Error(msg); break;
					case 'error': console.error(msg); break;
				}
			} /* else {
				alert(msg);
			} //*/
		}

		App.trigger("_log", { level: level, message: msg });
	}

	App.get = function(url) {
		var data = "<h1> failed to load url: " + url + "</h1>";
		
		$.ajax({
			async: false,
			url: url,
			contentType: 'text',
			success: function(response) {
				data = response;
			}
		});

		return data;
	}

	App.template = function(url, data) {
		var raw = App.get(url);
		return _.template(App.get(url), data); 
	}

	App.Module = function(packg) {
		if(typeof packg === 'undefined' || (typeof packg === 'object' && typeof packg.name === 'undefined')) {
			throw new Error("You must define a package name!");
			return;
		}

		var Module = {};
		var name = packg.name;

		Module.package = packg;
		Module.config  = {};

		Module.log = function(msg, _level) {
			App.log('[' + name + '] - ' + msg, _level);
		};

		Module.listen = function(Mod, evt, handler) {
			if(typeof Mod === 'string') {
				Mod = App.getModule(Mod);
			}
			
			App.on(Mod.package.name + ':' + evt, handler);
		};

		Module.on = function(evt, handler) {
			App.on(name + ':' + evt, handler);
		};

		Module.off = function(evt, handler) {
			App.off(name + ':' + evt, handler);
		};

		Module.trigger = function(evt, args) {
			App.trigger(name + ':' + evt, args);
		}
		
		Module._bootstrap = function() {
			Module.Model = Bb.Model;
			Module.Collection = Bb.Collection;
			Module.View = Bb.View;
			Module.Backbone = Bb;
		}
		
		Module.Request = function(path, method, data, address, cb) {
			if(typeof window.Settings === 'object' && typeof window.Settings.url === 'string' && window.Settings.url.length > 0) {
				var _addr = window.Settings.url;
			} else {
				var _addr = '';
			}			
			
			if(typeof method === 'function' && typeof data === 'undefined') {
				var cb 		= method;
				var method 	= 'GET';
				var data 	= null;
				var address = _addr;
			}
			
			if(typeof data === 'function' && typeof address === 'undefined') {
				var cb 		= data;
				var data 	= null;
				var address = _addr;
			}
			
			if(typeof address === 'function' && typeof cb === 'undefined') {
				var cb 		= address;
				var address = _addr;
			}
			
			var _data = {
				'_method': method.toUpperCase()
			}
			
			_data = _.extend(_data, data);
			
			$.ajax({
				url: address + path,
				data: _data,
				type: 'POST',
				
				success: function(response, status) {
					if(status == 'success') {
						cb(null, response);
					} else {
						cb("Something went wrong...", response);
					}
				}
			});
		}

		return Module;
	}

	App.register = function(Module, initializer, _config) {
		var cfg  = _config ? _.extend(App.config, _config) : App.config;

		App.modules[Module.package.name] = Module;
		
		App.initializers.push(function() {
			App.log("[" + App.package.name + "] - Initializing Module: " + Module.package.name, "info");
			return initializer(cfg);
		});

		if(App.started === true) {
			App.log("[" + App.package.name + "] - Initializing Module: " + Module.package.name, "info");
			return initializer(cfg);
		}
	}

	App.getModule = function(name) {
		// console.log(App.modules);
		return App.modules[name];
	}

	App.start = function(globalConfig) {
		App.config  = _.extend(App.config, globalConfig);
		App.started = true;

		for(var i in App.initializers) {
			App.initializers[i]();
		}

		App.trigger('modules:loaded');
	}

	return App;

})(jQuery, _, Backbone);