(function($) {

	ImageBlock = function(url, src) {
		
		this.content 		= $('<div></div>').addClass('imageBlock');
		this.image 			= $('<img />').addClass('image');
		this.textWrapper 	= null;
		this.textTitel 		= null;
		this.textContent 	= null;
		this.url 			= url;
		this.src 			= ((typeof src === 'object' && typeof src.length === 'number') ? src : [src]);
		this.loadCallback 	= [];
		
		return this.render();
	}

	ImageBlock = ImageBlock.extendsFrom(Block);

	ImageBlock.prototype.render = function() {
		
		var self 	= this;
		var rotate 	= -1;
		var next 	= 0;
		var _src 	= this.src[0];
			
		if(this.src.length > 1) {
			rotate = this.src.slice(1, this.src.length);
			rotate.push(_src);
		}
		
		this.image.appendTo(this.content);
		
		this.image.bind('load', function() {
			if(self.loadCallback.length > 0) {
				for(var i in self.loadCallback) {
					var cb = self.loadCallback[i];
					
					if(typeof cb === 'function') {
						cb(self, self.image);
					}
				}
			}
			
		});

		this.image.attr('src', self.url + _src);
		this.setContent(this.content);
		
		if(rotate !== -1 && typeof rotate === 'object' && rotate.length > 0) {
				
			setInterval(function() {
				if(next >= rotate.length) {
					next = 0;
				}
			
				self.image.attr('src', self.url + rotate[next]);
				next += 1;
			}, 10000);
			
		}

		return this;
		
	}
	
	ImageBlock.prototype.onload = function(cb) {
		this.loadCallback.push(cb);
	}
	
	ImageBlock.prototype.setText = function(title, text) {
		
		this.textTitel = $('<h1></h1>');
		this.textContent =  $('<p></p>');
		this.textWrapper = $('<div></div>').addClass('text').css('position', 'absolute');
		this.textWrapper.appendTo(this.content);
		
		
		if(title !== '') this.textTitel.appendTo(this.textWrapper).append(title);
		if(text !== '') this.textContent.appendTo(this.textWrapper).append(text);
		
		return this;
		
	}

})(jQuery);