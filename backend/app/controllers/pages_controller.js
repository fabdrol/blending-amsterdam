var locomotive 		= require('locomotive')
,	Controller 		= locomotive.Controller;

var PagesController = new Controller();

PagesController.index = function() {
	this.title = 'Index'
	this.render();
}

PagesController.new = function() {
	this.title = 'New'
	this.render();
}

PagesController.show = function() {
	this.title = 'Show:' + this.params('id');
	this.render();
}

PagesController.edit = function() {
	this.title = 'Edit:' + this.params('id');
	this.render();
}

/* Handle (PUT) edit page data */
PagesController.update = function() {
	this.title = 'Update:' + this.params('id');
	this.render();
}

/* Handle (DELETE) destroy page */
PagesController.destroy = function() {
	this.title = 'Destroy:' + this.params('id');
	this.render();
}

/* Handle (POST) new page data */
PagesController.create = function() {
	this.title = 'Create'
	this.render();
}

module.exports = PagesController;
