/* Views */
var PageView = Backbone.View.extend({
	tagName: "div",
	className: "page",

	initialize: function(model, parent) {
		this.model = model;
		this.parent = parent;
		this.render();
	},
	
	render: function() {
		var model 	= this.model;
		var self 	= this;
		var el 		= this.$el;
		var par 	= $(this.parent);
		
		var parent 	= par.fadeOut(300, function() {
			$(this).empty();

			var ul = $('<ul></ul>');

			el.append('<h1>' + model.get('title') + '</h1>');
			el.append('<p>' + model.get('content') + '</p>');
			el.append(ul);

			$.each(model.get('children'), function(i, child) {
				console.log(child);
				ul.append('<li><a href="#/' + child.id + '">' + child.title + '</a></li>');
			});

			el.appendTo($(this));

			$(this).fadeIn(300);
		});
	}
});