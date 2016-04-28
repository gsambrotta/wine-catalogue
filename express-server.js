var express = require('express');
var serveStatic = require('serve-static');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');


module.exports = (PORT) => {

  const data_file = path.join(__dirname, 'src/data/data.json');

  const app = express();

  app.use(serveStatic(__dirname + '/build'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  // Additional middleware which will set headers that we need on each request.
  app.use(function(req, res, next) {
      // Set permissive CORS header - this allows this server to be used only as
      // an API server in conjunction with something like webpack-dev-server.
      res.setHeader('Access-Control-Allow-Origin', '*');

      // Disable caching
      res.setHeader('Cache-Control', 'no-cache');
      next();
  });

  // Here it read the api content
  app.get('/api', function(req, res) {
    fs.readFile(data_file, function(err, data) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(JSON.parse(data));
    });
  });

  // Here it write on api
  app.post('/api', function(req, res) {
    fs.readFile(data_file, function(err, data) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      var datas = JSON.parse(data);

      // new object properties
      var newData = {
        id: Date.now(),
        body: req.body.body
      };

      datas.push(newData);
      fs.writeFile(data_file, JSON.stringify(datas, null, 4), function(err) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        res.json(datas);
      });
    });
  });

  // Finally listen to the port
  app.listen(PORT, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('Listening at ' + PORT );
  });
}
