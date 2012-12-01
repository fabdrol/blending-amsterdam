var locomotive 	= require('locomotive')
,	Controller 	= locomotive.Controller
,	util 		= require('util')
,	PageModel	= require('../models/Page')
,	IndexModel	= require('../models/Index')
;

var PagesController = new Controller();

var setup = function(self) {
	self.Page = PageModel(self.app.get('db'));
	self.Index = IndexModel(self.app.get('db'));
	return self;
}

PagesController.index = function() {
	var self = setup(this);

	this.Page.findAll(function(err, pages) {
		if(err) {
			throw err;
			return;
		}

		self.title = "Index";
		self.pages = pages;

		self.render();
	});
}

PagesController.new = function() {
	var self = setup(this);

	this.Page.findAll(function(err, pages) {
		if(!err) {
			self.pages = pages;
		} else {
			self.pages = [];
		}

		self.render();
	});
	
}

PagesController.show = function() {
	var self = setup(this);

	this.Page.findByID(this.param('id'), function(err, page) {
		if(!err) {
			self.page = page;
			self.render();
		} else {
			self.redirect('/');
		}
	});
}

PagesController.edit = function() {
	var self = setup(this);
	var id = this.param('id');
	
	this.Page.findByID(id, function(err, doc) {
		self.item = doc;
		self.render();
	});
}

/* Handle (PUT) edit page data */
PagesController.update = function() {
	var self = setup(this);
	var id 	 = self.param('id');

	this.Page.update({ _id: id }, {

		$set: {
			content: {
				title: self.param('title'),
				text: self.param('text')
			}
		}

	}, function(err) {
		if( ! err) {
			self.redirect(self.urlFor({ controller: 'pages', id: id, action: 'edit' }));
		} else {
			self.title = err;
			self.render();
		}
	});
}

/* Handle (DELETE) destroy page */
PagesController.destroy = function() {
	var self = setup(this);
	var id 	 = self.params('id');

	self.Page.findByID(id, function(err, doc) {
		if(err) {
			self.title = err;
			self.render();
		} else {
			doc.remove(function(err, doc) {
				if(err) {
					self.title = err;
					self.render();
				} else {
					self.redirect('pages#index');
				}
			}); 
		}
	});
}

/* Handle (POST) new page data */
PagesController.create = function() {
	var self = setup(this);
	var page = new this.Page();

	page.content.title = this.param('title');
	page.content.text = this.param('text');

	page.save(function(error) {
		if(!error) {
			self.redirect(self.urlFor({controller: 'pages', action: 'index'}));
		} else {
			self.res.status(500).send("Error saving page...");
		}
	});
}

module.exports = PagesController;
