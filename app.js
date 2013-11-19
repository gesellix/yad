(function () {
  "use strict";
  var express = require('express');
  var dataprovider = require('./dataprovider');
  var http = require('http');
  var path = require('path');

  var app = express();

// all environments
//  app.engine('html', require('hogan-express'));
//  app.enable('view cache');
//  app.set('views', __dirname + '/views');
//  app.set('view engine', 'html');
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
//  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

// development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }

  dataprovider(app);
  app.get('/', function (req, res) {
    res.redirect('/index.html');
//    res.locals = {test: "test!"};
//    res.render('index', {});
  });

  http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
  });
})();