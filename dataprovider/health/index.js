exports = module.exports = function (app) {
  app.get('dataproviderScripts').push({ src: 'dataprovider/health.js' });
  app.get('/dataprovider/health.js', function (req, res) {
    res.sendfile(__dirname + '/views/health.js');
  });

  app.get('/dataprovider/health', function (req, res) {
//    res.set({'Content-Type': 'application/json'});
//    res.send(JSON.stringify({result: 'health-check' + Math.random().toString()}));

    res.locals = {
      "dataprovider-name": "health-check",
      "result": Math.random().toString()
    };
    res.render('dataprovider/health', {});
  });
};