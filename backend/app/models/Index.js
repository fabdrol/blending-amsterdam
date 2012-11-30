module.exports = function(mongoose) {
	var Schema 		= mongoose.Schema
	,	ID			= Schema.ObjectId
	;

	var Pages = new Schema({
		maps_to: 	String,
		title: 		String,
		page_id: 	ID,
		timeline: 	[ Pages ]
	});

	var Index = new Schema({
		
		root: [ Pages ],
		meta: {
			version: 	String,
			timestamp: 	Number,
			view_id: 	String,
		 	device: 	String
		}

	});

	return mongoose.model('Index', Index);
}