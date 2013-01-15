Database = (function(App, $, _) {

	var Module = App.Module({
		name: "Database",
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
	
	Module.Req = function(path, data, address, cb) {
		if(typeof window.Settings === 'object' && typeof window.Settings.url === 'string' && window.Settings.url.length > 0) {
			var _addr = window.Settings.url;
		} else {
			var _addr = '';
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
		
		console.log(address, path, data, typeof cb);
		
		$.ajax({
			url: address + path,
			type: 'GET',
			
			success: function(response, status) {
				if(status == 'success') {
					cb(null, response);
				} else {
					cb("Something went wrong...", response);
				}
			}
		});
	}
	
	Module.load = function(cb) {
		Module.Req(Module.config.datadir + '/index.json', function(err, response) {
			if(!err) {
				try {
					Module.data.index = JSON.parse(response);
					
					var done = 0;
					var total = 0;
					var errors = [];
					
					for(var key in Module.data.index.locations) {
						(function(key, loc) {
							total += 1;
							
							Module.Req(Module.config.datadir + '/' + loc + '/index.json', function(err, resp) {
								done += 1;
								
								if(!err) {
									try {
										var d = JSON.parse(resp);
										
										d.root  = Module.config.datadir + '/' + loc + '/';
										d.media = Module.config.datadir + '/' + loc + '/media/';
										d.key 	= key;
										
										for(var i in d.events) {
											d.events[i].root = Module.config.datadir + '/' + loc + '/';
											d.events[i].media = Module.config.datadir + '/' + loc + '/media/';
											d.events[i].key = key;
											
											for(var j in d.events[i].content) {
												d.events[i].content[j].media = Module.config.datadir + '/' + loc + '/media/';
												d.events[i].content[j].root  = Module.config.datadir + '/' + loc + '/';
												d.events[i].content[j].key   = key;
											}
										}
										
										Module.data.locations[loc] = d;
									} catch(e) {
										errors.push(e);
									}
								} else {
									errors.push(err);
								}
								
								if(done === total) {
									cb(errors);
								}
							});
						})(key, Module.data.index.locations[key]);
					}
				} catch(e) {
					cb(e);
				}
			} else {
				cb(err);
			}
		});
	}

	Module.init = function(config) {
		Module.config = _.extend(Module.config, config);
		Module._bootstrap();
		
		Module.load(function(err) {
			if(!err || err.length === 0) {
				Module.config.ready(null, Module.data);
			} else {
				Module.config.ready(err);
			}
		});
	};

	return Module;

})(App, jQuery, _);