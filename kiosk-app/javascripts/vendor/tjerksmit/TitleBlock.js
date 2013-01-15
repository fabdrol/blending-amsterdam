(function($) {	
	TitleBlock = function(title, subtitle) {
		
		this.content = $('<div></div>').addClass('titleBlock');
		
		this.title = $('<h1></h1>');
		this.subTitle = $('<h2></h2>');
		
		this.button = $('<a></a>').attr('href', '#').addClass('titleButton');
		
		this.titleContent = title;
		this.subTitleContent = subtitle;
		
		return this.render();
		
	}
	
	TitleBlock = TitleBlock.extendsFrom(Block);
	
	TitleBlock.prototype.render = function() {
	
		this.title.appendTo(this.content).append(this.titleContent);
		this.subTitle.appendTo(this.content).append(this.subTitleContent);
		this.setContent(this.content);
		
		return this;
	}
	
	Block.prototype.setButton = function(position, value, callback) {
		
		this.button.appendTo(this.content);
		
		var self = this;	
		var positionHorizontal 	= -( this.button.width() / 2 );
		var positionVertical 	= -( this.button.height() / 2 );
		
		if (position == 'top') {
			this.button.css('left', positionHorizontal + 'px' );
			this.button.css('top', positionVertical + 'px' );
		}
		
		if (position == 'bottom') {
			this.button.css('right', positionHorizontal + 'px' );
			this.button.css('bottom', positionVertical + 'px' );
		}
		
		this.button.append(value);
		this.button.bind('click', function() {
			callback(self.content, self.button, self);
		});
		
	}
	
		
	
	
})(jQuery);