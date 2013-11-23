(function () {
  "use strict";
  var express = require('express');
  var hbs = require('express-hbs');
  var http = require('http');
  var path = require('path');

  var app = express();

  var express_hbs_options = {
    defaultLayout: __dirname + '/views/layout/default.hbs',
    layoutsDir: __dirname + '/views/layout',
    partialsDir: __dirname + '/views/partials',
    extname: '.hbs'
  };

  // all environments
  app.engine('hbs', hbs.express3(express_hbs_options));
  app.enable('view cache');
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hbs');
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
//  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  // production only
  if ('production' == app.get('env')) {
//    app.set('PROD_MODE', 'true');
  }
  // development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }

  app.set('dataproviderScripts', []);
  require('./dataprovider')(app);

  app.get('/', function (req, res) {
//    res.redirect('/index.html');
    res.locals = {
      title: "Yet Another Dashboard",
      dataproviderScripts: app.get('dataproviderScripts')
    };
    res.render('index', {});
  });

  http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
  });
})();