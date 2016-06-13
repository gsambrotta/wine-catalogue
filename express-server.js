'use strict';

const express = require('express');
const serveStatic = require('serve-static');
const fs = require('fs');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const bl = require('bl');
const _ = require('lodash');
const multer = require('multer');

module.exports = (PORT) => {
  
  const wineData = path.join(__dirname, 'src/data/wine.json');
  const categoryData = path.join(__dirname, 'src/data/categories.json');
  const regionData = path.join(__dirname, 'src/data/region.json');
  const imagesData = path.join(__dirname, 'src/data/images.json');

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

  app.get('/api/images', function (req, res) {
    fs.readFile(imagesData, function (err, data) {
      if (err) {
        console.error(err);
        process.exit(1);
      } else {
        const images = JSON.parse(data);
        res.json(images);
      }
    });
  })


  // Write datas
  app.post('/api/wines:id', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400)
    console.log(req.body);

    const id = Date.now();
    const previousWines = JSON.parse(fs.readFileSync(wineData));

    if (_.find(previousWines, wine => wine.id === id)) {
      // update existing wine
    } else {
      fs.writeFile(wineData, JSON.stringify([
        ...previousWines,
        {
          //...req.body, // req.body = {id: 1, title: 2} ==> id: 1, title: 2
          id
        }
      ]));
    }

    res.status(202);
    res.end("new wine posted");
  })

  app.post('/api/categories', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400)
    console.log(req.body);

    const previousCat = JSON.parse(fs.readFileSync(categoriesData));
    if (_.find(previousCat, cat => cat.id === id)) {
      // update existing category
    } else {
      fs.writeFile(categoriesData, JSON.stringify([
        ...previousCat,
        {
          //...req.body // req.body = {id: 1, title: 2} ==> id: 1, title: 2
        }
      ]));
    }

    res.status(202);
    res.end("new category posted");
  })


  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },

    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now());
    }
  });
  
  const upload = multer({ storage : storage}).single('userPhoto');

  // Image upload
  app.post('/api/images', function(req, res, next){
    upload(req, res, function(err) {
      if(err) {
        return res.end("Error uploading file.");
      }
      console.log(req.file) // I should see image array!
      res.end("msg form express: File is uploaded");
    });
  });

  
  // Finally, listen to the port
  app.listen(PORT, function (err) {
    if (err) { 
      console.log(err);
      return;
    }
    console.log('Express listening at ' + PORT);
  });
};
