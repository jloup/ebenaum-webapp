var connect = require('connect');
var serveStatic = require('serve-static');
var fs = require('fs');

connect()
  .use(serveStatic(__dirname + '/build/dist'))
  .use(function(req, res) {
    res.end(fs.readFileSync(__dirname + '/build/dist/index.html'));
  })
  .listen(8081, function(){
    console.log('Server running on 8081...');
  });
