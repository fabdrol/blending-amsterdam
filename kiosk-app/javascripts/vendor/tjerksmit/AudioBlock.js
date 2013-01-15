(function($) {	
	AudioBlock = function(src, vol) {
	
		var vol = vol || 1;
			
		this.el.attr('data-status', 'paused');
		this.content = $('<div></div>').addClass('audioBlock');
		this.audio = $('<audio></audio>').addClass('audio');
		
		this.audio.prop('volume', vol);
		
		if(typeof src !== 'undefined') {
			this.src(src);
		}
		
		return this;
		
	}
	
	AudioBlock = AudioBlock.extendsFrom(Block);
	
	AudioBlock.prototype.render = function() {
		
		var self = this;
		this.audio.appendTo(this.content);
		this.audio.attr('src', this.src);
		this.setContent(this.content);
		return this;
	}	
	
	AudioBlock.prototype.src = function(src) {
		
		var self = this;
		this.src = src;
		this.audio.attr('src', this.src);
		return this;
	}
	
	AudioBlock.prototype.play = function() {
		
		var self = this;
		this.audio.get(0).play();
		return this;
		
	}
	
	AudioBlock.prototype.pause = function() {
		
		var self = this;
		this.audio.get(0).pause();
		return this;
		
	}
	
	// callback API: fn (event, audio DOM element, audio jQuery element, AudioBlock class).
	AudioBlock.prototype.on = function(event, callback) {
		
		var self = this;
		
		/*	
		* 	AUDIO ELEMENT - EVENTS
		*	http://www.w3schools.com/tags/ref_av_dom.asp
		*
		*	ended: fired when the video has ended.
		* 	pause: fired when the video is paused.
		*	play: fired when the video plays
		*	timeupdate: fired when the playback position changes (during play)
		*/
		
		this.audio.bind(event, function(evt) {
			callback(evt, sefl.audio.get(0), self.audio, self);
		});
		
	}
	
		
})(jQuery);

	
	