'use strict';

const express = require('express');
const serveStatic = require('serve-static');
const fs = require('fs');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const bl = require('bl');
const _ = require('lodash');

module.exports = (PORT) => {
  
  const wineData = path.join(__dirname, 'src/data/wine.json');
  const categoryData = path.join(__dirname, 'src/data/categories.json');
  const regionData = path.join(__dirname, 'src/data/region.json');

  const app = express();
  const jsonParser = bodyParser.json();

  app.use(serveStatic(__dirname + '/build'));
  app.use(jsonParser);
  app.use(bodyParser.urlencoded({extended: true}));

  // Additional middleware which will set headers that we need on each request.
  app.use(function (req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching
    res.setHeader('Cache-Control', 'no-cache');
    // 1_ Don't i need something like this?
    //res.status(404).send('Page not found');
    next();
  });


  // Read datas
  app.get('/api/wines', function (req, res) {
    fs.readFile(wineData, function (err, data) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(JSON.parse(data));
    });
  })

  app.get('/api/categories', function (req, res) {
    fs.readFile(categoryData, function (err, data) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(JSON.parse(data));
    });
  })

  app.get('/api/regions', function (req, res) {
    fs.readFile(regionData, function (err, data) {
      if (err) {
        console.error(err);
        process.exit(1);
      } else {
        const regions = JSON.parse(data);
        res.json(regions);
      }
    });
  })

  app.get('/api/regions/:id', function (req, res) {
    fs.readFile(regionData, function (err, data) {
      if (err) {
        console.error(err);
        process.exit(1);
      } else {
        const regions = JSON.parse(data);
        res.json(_.find(regions, region => region.id === req.params.id));
      }
    });
  })


  // Write datas
  app.post('/api/wines', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400)
    // req.body
    // 2_ Not sure how should i do here 
    // Also, how can i tell to it, in which file it should write?
    console.log(req.body);

    const id = Date.now();
    const title = req.body.title;
    const description = req.body.description;
    const producer = req.body.producer;
    const thumb = req.body.thumb;
    const profile_pic = req.body.profile_pic;
    const category = req.body.category;
    const region = req.body.region;
    res.status(202);
    res.end("yes");
  })

  app.post('/api/categories', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400)
    // req.body
    console.log(req.body);
    res.status(202);
    //res.send();
    res.end("yes");
  })

  /*
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

  // Finally, listen to the port
  app.listen(PORT, function (err) {
    if (err) { 
      console.log(err);
      return;
    }
    console.log('Express listening at ' + PORT);
  });
};
