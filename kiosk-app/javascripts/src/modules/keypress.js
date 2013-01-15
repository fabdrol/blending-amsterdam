KeyPress = (function(App, $, _, Backbone) {

	var Module = App.Module({
		name: "KeyPress",
		description: "",
		author: "Fabian Tollenaar (c) Starting Point",
		version: "0.1"
	});

	Module.config = _.extend(Module.config, {
		// Add defaults
	});
	
	Module.keymap = function(key) {
		var map = {
			'0' : '48',
			'1' : '49',
			'2' : '50',
			'3' : '51',
			'4' : '52',
			'5' : '53',
			'6' : '54',
			'7' : '55',
			'8' : '56',
			'9' : '57',
			'a' : '65',
			'b' : '66',
			'c' : '67',
			'd' : '68',
			'e' : '69',
			'f' : '70',
			'g' : '71',
			'h' : '72',
			'i' : '73',
			'j' : '74',
			'k' : '75',
			'l' : '76',
			'm' : '77',
			'n' : '78',
			'o' : '79',
			'p' : '80',
			'q' : '81',
			'r' : '82',
			's' : '83',
			't' : '84',
			'u' : '85',
			'v' : '86',
			'w' : '87',
			'x' : '88',
			'y' : '89',
			'z' : '90',
			'left_arrow' 	: '37',
			'up_arrow' 		: '38',
			'right_arrow' 	: '39',
			'down_arrow' 	: '40',
			'spacebar'		: '32'
		};
		
		if(typeof map[key] !== 'undefined') {
			return parseInt(map[key]);
		} else {
			return -1;
		}
	}
	
	Module.add = function(_key, cb) {
		var key = _key.toLowerCase();
		var num = Module.keymap(key);
		
		if(num !== -1) {
			Module.log("Adding callback for key '" + key + "' (" + num + ").");
			
			$(document).keyup(function(e) {
				if(parseInt(e.which) === num) {
					cb('document');
				}
			});
		} else {
			Module.log('Num for key ' + key + ' was -1');
		}
	}

	Module.init = function(config) {
		Module.config = _.extend(Module.config, config);
	};

	return Module;

})(App, jQuery, _, Backbone);