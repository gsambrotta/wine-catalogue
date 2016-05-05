'use strict';

const express = require('express');
const serveStatic = require('serve-static');
const fs = require('fs');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const bl = require('bl');

module.exports = (PORT) => {
  
  const portString = 'localhost:'+ PORT +'';
  const wineData = path.join(__dirname, 'src/data/wine.json');
  const categoryData = path.join(__dirname, 'src/data/categories.json');
  const regionData = path.join(__dirname, 'src/data/region.json');

  const wineDataUrl = 'http://localhost:3001/src/data/wine.json'; //try to get my json as http
  const app = express();

  const dataFiles = [];
  dataFiles.push(wineData, categoryData, regionData);
  const results = [];
  const count = 0;

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
  

  function httpGet (index) {
    app.get('/api', function(req, res) {
      console.log(wineDataUrl)

      try {
        http.get( dataFiles[0 + index], function(response) {
          response.pipe(bl (function (err, data) {
          if (err) {
            return console.log('this is my error: ' + err )
          } 
          results[index] = data.toString();
          count++

          if (count == 3) {
            res.json(JSON.parse(data));
          }
          })) 
        })
      } catch(e) {
        console.error('Try catch error: ' + e);
      }
    })
  }
  
  for(var i = 0; i < 3; i++) {
    httpGet(i)
  }

  /*
  // Here it read the api content
  app.get('/api', function (req, res) {
    fs.readFile(wineData, function (err, data) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(JSON.parse(data));
    });
  });

  // Here it write on api
  app.post('/api', function (req, res) {
    fs.readFile(wineData, function (err, data) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      let wines = JSON.parse(data);

      // new object properties
      let newWine = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description,
        producer: req.body.producer,
        thumb: req.body.thumb,
        profile_pic: req.body.profile_pic,
        category: req.body.category,
        region: req.body.region
      };

      wines.push(newWine);
      fs.writeFile(wineData, JSON.stringify(wines, null, 4), function (error) {
        if (error) {
          console.error(error);
          process.exit(1);
        }
        res.json(wines);
      });
    });
  });
  */

  // Finally listen to the port
  app.listen(PORT, function (err) {
    if (err) { 
      console.log(err);
      return;
    }
    console.log('Express listening at ' + PORT);
    /*
    for(var i = 0; i<3; i++) {
      httpGet(i)
    }
    */
  });
};


