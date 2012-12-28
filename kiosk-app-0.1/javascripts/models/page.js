var Page = Backbone.Model.extend({
	id 		: null,
	title	: null,
	content : null,
	position: 0,
	file	: '',
	fetched : false,
	children: [],

	initialize: function(_data, _child, cb) {
		var self = this, data, fetch, is_child;

		if(typeof _data === 'string') {
			data = JSON.parse(_data);
		} else {
			data = _data;
		}

		is_child = _child || false;

		fetch = function(page, cb) {
			$.getJSON('data/' + page.file, function(result) {
				cb(result);
			});
		};

		fetch(data, function(result) {
			if(typeof result === 'object' && typeof result.title !== 'undefined' && typeof result.content !== 'undefined') {
				self.set('id', result.id);
				self.set('title', result.title);
				self.set('content', result.content);
				self.set('fetched', true);
			}

			if(typeof cb === 'function') {
				cb(self);
			}
		});

		self.set('id', data.id);
		self.set('position', data.position);
		self.set('file', data.file);

		if(typeof data.children !== 'undefined' && data.children.length > 0) {
			$.each(data.children, function(i, child) {
				new Page(child, true, function(childPage) {
					self.children.push(childPage);
				});
			});
		} else {
			// page is subpage. 
		}
	}
});