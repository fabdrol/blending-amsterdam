var express   = require('express')
  , poweredBy = require('connect-powered-by')
  , util      = require('util')
  , mongoose  = require('mongoose')

module.exports = function() {
  
    if (this.version !== require('locomotive').version) {
        console.warn(util.format('version mismatch between local (%s) and global (%s) Locomotive module', require('locomotive').version, this.version));
    }

    this.set('views', __dirname + '/../../app/views');
    this.set('view engine', 'ejs');
    this.set('db', mongoose.connect('mongodb://localhost/blending_amsterdam'));

    this.engine('ejs', require('ejs').__express);
    this.datastore(require('locomotive-mongoose'));

    this.format('html', { engine: 'ejs'});
    this.format('json', { engine: 'ejs'});

    this.use(express.logger());
    this.use(express.favicon());
    this.use(express.static(__dirname + '/../../public'));
    this.use(express.bodyParser());
    this.use(express.methodOverride());
    this.use(this.router);

}