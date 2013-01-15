BlockManager = (function(App, $, _) {

	var Module = App.Module({
		name: "BlockManager",
		description: "",
		author: "Fabian Tollenaar (c) Starting Point",
		version: "0.3"
	});
	
	Module.canvas 	= null;
	Module.blocks 	= [];
	
	Module.config = _.extend(Module.config, {
		canvas: '#canvas'	
	});
	
	Module.uid = function() {
		var time = new Date().getTime();
		return 'bid.'+time;
	}
	
	Module.calculateBlockPositions = function(blockN) {
		var cw, ch, x, y, o;
		
		o  = [];
		cw = Module.canvas.width();
		ch = Module.canvas.height();
		
		switch(blockN) {
			case 1:
				x = Math.floor(cw * 0.25);
				y = Math.floor(ch * 0.25);
				o.push([x, y]);
			break;
			
			case 2: 
				o.push([Math.floor(cw * 0.1), Math.floor(ch * 0.25)]);
				o.push([Math.floor(cw * 0.55), Math.floor(ch * 0.25)]);
			break;
			
			case 3: 
				o.push([Math.floor(cw * 0.1), Math.floor(ch * 0.25)]);
				o.push([Math.floor(cw * 0.55), Math.floor(ch * 0.1)]);
				o.push([Math.floor(cw * 0.55), Math.floor(ch * 0.55)]);
			break;
			
			case 4: 
				o.push([Math.floor(cw * 0.1), Math.floor(ch * 0.1)]);
				o.push([Math.floor(cw * 0.1), Math.floor(ch * 0.55)]);
				o.push([Math.floor(cw * 0.55), Math.floor(ch * 0.1)]);
				o.push([Math.floor(cw * 0.55), Math.floor(ch * 0.55)]);
			break;
		}
		
		return o;
	}
	
	Module.calculateBlockSizes = function(blockN) {
		var cw, ch, w, h, o;
		
		o = [];
		cw = Module.canvas.width();
		ch = Module.canvas.height();
		
		switch(blockN) {
			case 1:
				w = Math.floor(cw * 0.5);
				h = Math.floor(ch * 0.5);
				
				o.push([w, h]);
			break;
			
			case 2: 
				w = Math.floor(cw * 0.35);
				h = Math.floor(ch * 0.5);
				
				o.push([w, h]);
				o.push([w, h]);
			break;
			
			case 3: 
				w = Math.floor(cw * 0.35);
				h = Math.floor(ch * 0.35);
				
				o.push([w, Math.floor(ch * 0.5)]); 
				o.push([w, h]);
				o.push([w, h]);
			break;
			
			case 4: 
				w = Math.floor(cw * 0.35);
				h = Math.floor(ch * 0.35);
				
				o.push([w, h]);
				o.push([w, h]);
				o.push([w, h]);
				o.push([w, h]);
			break;
		}
		
		return o;
	}
	
	Module.addBlock = function(data, size, pos, _url) {
		var width 	= size[0];
		var height 	= size[1];
		var left 	= pos[0];
		var top 	= pos[1];
		
		if(typeof data.media === 'undefined' && typeof _url === 'undefined') {
			var url = '';
		} else if(typeof data.media === 'string') {
			var url = data.media;
		} else {
			var url = _url;	
		}
		
		switch(data.type) {
			case 'text':
				var Block = new TextBlock(data.title, data.content);
			break;
			
			case 'image':
				var Block = new ImageBlock(url, data.content);
				Block.setText(data.title, '');
			break;
			
			case 'video':
				var Block = new VideoBlock(url, data.content);
				
				Module.listen('Chrome', 'btn_press', function(btn) {
					if(btn.button === 'play') {
						Block.play();
					}
				});
			break;
			
			case 'audio':
				var Block = new AudioBlock(url, data.content);
				
				Module.listen('Chrome', 'btn_press', function(btn) {
					if(btn.button === 'play') {
						Block.play();
					}
				});
			break;
		}
		
		var obj = {
			block: Block,
			type: data.type,
			
			destroy: function() {
				if(data.type === 'video') {
					obj.block.pause();
					obj.block.video.attr('src', 'dummy.mov').remove();
				} 
				
				obj.block.el.remove();
				obj.block = null;
			},
			
			getPosition: function() {
				return obj.block.getPosition();
			},
			
			getSize: function() {
				return obj.block.getSize();
			}
		};
		
		Block.setSize(width, height);
		Block.setPosition(left, top);
		Block.appendTo(Module.canvas);
		
		Module.blocks.push(obj);
		
		return Block;
	}
	
	Module.createBlocks = function(content, _url) {
		var total = content.length;
		
		if(total > 4) {
			Module.log("Too many blocks. Rendering the first 4");
			
			content = content.slice(0, 4);
			total = 4;
		}
		
		var sizes = Module.calculateBlockSizes(total);
		var positions = Module.calculateBlockPositions(total);
		
		for(var i in content) {
			(function(data, size, pos) {
				Module.addBlock(data, size, pos, _url);
			})(content[i], sizes[i], positions[i]);
		}
	}
	
	Module.replace = function(data, _speed) {
		var speed = _speed || 300;
		
		for(var i in Module.blocks) {
			(function(b, i) {
				b.block.el.fadeOut(speed, function() {
					b.destroy();
				});
			})(Module.blocks[i], i);
		}
		
		if(speed > 0) {
			setTimeout(function() {
				Module.blocks = [];
				Module.createBlocks(data.content, data.media);
			}, speed);
		} else {
			Module.blocks = [];
			Module.createBlocks(data.content, data.media);		
		}
	}

	Module.init = function(config) {
		Module.config = _.extend(Module.config, config);
		Module.canvas = $(Module.config.canvas);
	};

	return Module;

})(App, jQuery, _);