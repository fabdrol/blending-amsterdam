(function($) {	
	TextBlock = function(title, text) {
		this.content = $('<div></div>').addClass('textBlock');
		this.textTitle = $('<h1></h1>');
		this.textContent = $('<p></p>');
		this.title = title;
		this.text = text;
		return this.render();	
	}
	
	TextBlock = TextBlock.extendsFrom(Block);
	
	TextBlock.prototype.render = function() {
	
		var self = this;

		this.textTitle.appendTo(this.content).append(this.title);
		this.textContent.appendTo(this.content).append(this.text);
		this.setContent(this.content);
		return this;

	
	}
	
})(jQuery);