'use strict';

const express = require('express');
const serveStatic = require('serve-static');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');


module.exports = (PORT) => {
  
  const dataFile = path.join(__dirname, 'src/data/data.json');
  const app = express();

  app.use(serveStatic(__dirname + '/build'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  // Additional middleware which will set headers that we need on each request.
  app.use(function (req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  // Here it read the api content
  app.get('/api', function (req, res) {
    fs.readFile(dataFile, function (err, data) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(JSON.parse(data));
    });
  });

  // Here it write on api
  app.post('/api', function (req, res) {
    fs.readFile(dataFile, function (err, data) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      let datas = JSON.parse(data);

      // new object properties
      let newData = {
        id: Date.now(),
        body: req.body.body
      };

      datas.push(newData);
      fs.writeFile(dataFile, JSON.stringify(datas, null, 4), function (error) {
        if (error) {
          console.error(error);
          process.exit(1);
        }
        res.json(datas);
      });
    });
  });

  // Finally listen to the port
  app.listen(PORT, function (err) {
    if (err) { 
      console.log(err);
      return;
    }
    console.log('Express listening at ' + PORT);
  });
};


