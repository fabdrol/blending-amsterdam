(function($) {

	$.fetchPage = function(page, base, cb) {
		if(typeof cb === 'undefined' && typeof base === 'function') {
			cb = base;
			base = '';
		}

		var obj = page;
		var children = page.children || [];

		$.getJSON(base + page.file, function(json, status) {
			if(status == 'success' && typeof json === 'object') {
				obj.id 		= json.id || -1;
				obj.title 	= json.title || '';
				obj.content = json.content || '';

				if(children.length > 0) {
					var total = children.length;
					var done = 0;
					var temp = [];

					$.each(children, function(i, child) {
						$.fetchPage(child, base, function(err, result) {
							if(!err) {
								temp.push(result);
							}

							done += 1;

							if(done >= total) {
								obj.children = temp;
								cb(null, obj);
							}
						});
					});
				} else {
					cb(null, obj);
				}
			} else {
				cb("Error fetching page.");
			}
		});
	}	

})(jQuery);

$(document).ready(function() {

	var index 	= new Index();
	var parent 	= $('#menu');

	var download = function(item, cb) {
		return function() {
			$.fetchPage(item, 'data/', cb);
		}
	}

	index.on('add', function(page) {
		var link = $('<a href="#/' + page.get('id') + '">' + page.get('title') + ' (' + page.get('children').length + ')</a>');
		parent.append(link);

		link.bind('click', function() {
			new PageView(page, '#parent');
		});
	});

	$.getJSON('data/index.json', function(results) {
		var downloads = [];

		$.each(results, function(index, page) {
			downloads.push(function(callback) {
				$.fetchPage(page, 'data/', callback);
			});
		});

		async.parallel(downloads, function(err, pages) {
			if(err) {
				console.log(err);
				return;
			} else {
				parent.empty();
				index.add(pages);
			}
		});
	});

});