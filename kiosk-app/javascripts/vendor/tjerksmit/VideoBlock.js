(function($) {
	
	VideoBlock = function(url, src, vol) {
	
		var vol = vol || 1;
		
		this.el.attr('data-status', 'paused');
		
		this.placeholder = $('<div></div>').addClass('placeholder').html('Press "play" to view');
		this.content = $('<div></div>').addClass('videoBlock');
		this.video 	 = $('<video></video>').addClass('video');
		this.url 	 = url;
		this.video.prop('volume', vol);
		
		if(typeof src !== 'undefined') {
			this.src(src);
		}
		
		return this.render();
	
	}
	
	VideoBlock = VideoBlock.extendsFrom(Block);
	
	VideoBlock.prototype.render = function() {
		
		var self = this;
		
		this.video.appendTo(this.content);
		this.video.css('width', this.width);
		this.content.append(this.placeholder);
		this.setContent(this.content);
		return this;

	}
	
	VideoBlock.prototype.src = function(src) {		
		var self = this;
		this.src = src;
		this.video.attr('src', this.url + this.src);
		return this;
	}
	
	VideoBlock.prototype.play = function() {
		var self = this;
		this.placeholder.hide();
		this.video.get(0).play();
		return this;
	}
	
	VideoBlock.prototype.pause = function() {
		var self = this;
		this.placeholder.show();
		this.video.get(0).pause();
		return this;
	}
	
	VideoBlock.prototype.destroy = function(_speed) {
		this.video.get(0).pause();
		delete this.video;
		
		this.el.empty();
		this.el.remove();
	}
	
	// callback API: fn (event, video DOM element, video jQuery element, VideoBlock class).
	VideoBlock.prototype.on = function(event, callback) {
		var self = this;
		
		/*	
		* 	VIDEO ELEMENT - EVENTS
		*	http://www.w3schools.com/tags/ref_av_dom.asp
		*
		*	ended: fired when the video has ended.
		* 	pause: fired when the video is paused.
		*	play: fired when the video plays
		*	timeupdate: fired when the playback position changes (during play)
		*/
		
		this.video.bind(event, function(evt) {
			callback(evt, self.video.get(0), self.video, self);
		});	
	}
	
})(jQuery);