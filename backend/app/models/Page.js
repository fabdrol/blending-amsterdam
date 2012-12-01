module.exports = function(mongoose) {
	var Schema 		= mongoose.Schema
	,	ID			= Schema.ObjectId
	;

	var Media = new Schema({
		type: String,
		path: String
	});

	var Page = new Schema({
		
		media: [ Media ],
		
		content: {
			title: 		{ type: String, default: 'New Page' },
			text: 		{ type: String, default: 'New page content...' },
			location: 	{ type: String, default: 'default' }
		},

		meta: {
			version: 	{ type: String, default: '-' },
			timestamp: 	{ type: Number, default: function() { return Date.now(); } },
			view_id: 	ID,
		 	device: 	{ type: String, default: 'all' }
		}

	});

	Page.statics.findAll = function(cb) {
		this.find({}, cb);
	}

	Page.statics.findByID = function(id, cb) {
		this.findOne({ _id: id }, cb);
	}

	return mongoose.model('Page', Page);
}