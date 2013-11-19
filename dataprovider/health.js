exports = module.exports = function (app) {
  app.get('/health', function (req, res) {
    res.set({'Content-Type': 'application/json'});
    res.send(JSON.stringify({result: 'health-check'}));
  });
};