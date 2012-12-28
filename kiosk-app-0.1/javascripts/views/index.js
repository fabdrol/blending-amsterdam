/* Views */
var IndexView = Backbone.View.extend({
	tagName: "a",
	className: "main_nav",

	initialize: function() {
		this.listenTo(this.model, "change", this.render);
	},
	
	render: function() {
		var model 	= this.model;
		var self 	= this;
		var el 		= this.$el;
		
		if(model.get('fetched') == true) {
			var parent 	= $('#parent').fadeOut(300, function() {
				el.attr('href', '#/' + model.get('id'));
				el.html(model.get('title'));
				
				el.bind('click', function() {
					console.log(model);
				});

				$(this).append(el).append('<br>').fadeIn(300);
			});
		}
	}
});