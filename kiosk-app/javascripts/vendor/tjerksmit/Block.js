(function($) {

	// No need to create two closures
	Function.prototype.extendsFrom = function(Super) {
		var Self = this; 
		var Func = function() {
			Super.apply(this, arguments);
			Self.apply(this, arguments);
		}
		Func.prototype = new Super();
		return Func;
	}

	//superclass Block
	Block = function() {
		
		this.el 		= $('<div></div>').addClass('block');
		this.size 		= [];
		this.position 	= [];

	}
	
	Block.prototype.remove_el = function() {
		this.el.remove();
		this.size 		= [];
		this.position 	= [];
	}
	
	Block.prototype.appendTo = function(parent) {
		 
		 this.el.appendTo(parent);
		 return this;
	}

	Block.prototype.setSize = function(w, h) {
    	 
    	 this.size = [w, h];
    	 this.el.css('width', w); 
         this.el.css('height', h);
         return this;    
	}
	
	Block.prototype.setPosition = function(x, y, _speed) {

		speed = _speed || 0;
		
		this.position = [x, y];
		this.el.animate({
			'left': x + 'px', 
			'top': y + 'px'
		}, speed);
		
		return this;
	}
	
	Block.prototype.setContent =  function (content) {
		this.el.append(content);
		return this;
	}
	
	Block.prototype.getSize = function() {
		
		return this.size; 
	}
	
	Block.prototype.getPosition = function() {
		return this.position;	
	}
	
	Block.prototype.getElement = function() {
		return this.el;
	}




	
})(jQuery);

