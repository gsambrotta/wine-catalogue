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
const statics = require('serve-static');
const crypto = require('crypto');

module.exports = (PORT) => {

  const wineData = path.join(__dirname, 'src/data/wine.json');
  const categoryData = path.join(__dirname, 'src/data/categories.json');
  const regionData = path.join(__dirname, 'src/data/region.json');
  const imagesData = path.join(__dirname, 'src/data/images.json');

  const app = express();
  const jsonParser = bodyParser.json();
  let token;
  const nuid = 'demo';
  const ssw = 'demopassword'

  app.use(statics(__dirname + '/uploads'));

  app.use(serveStatic(__dirname + '/build'));
  app.use(jsonParser);
  app.use(bodyParser.urlencoded({extended: true}));

  // Additional middleware which will set headers that we need on each request.
  app.use(function (req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    // Disable caching
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  crypto.randomBytes(48, function(err, buffer) {
    token = buffer.toString('hex');
  });

  // Login route
  app.post('/api/auth', jsonParser, function (req, res) {
    var post = req.body;
    if (post.username === nuid && post.password === ssw) {
      res.status(200);
      res.json({
        ok: true,
        token: token,
        expires: new Date(+new Date() + 1000 * 60 * 60 * 12)
      });

    } else {
      res.status(401);
      res.json({
        error: true
      });
    }
  });

  // Logout route
  app.get('/logout', function (req, res) {
    delete req.session.user_id;
    res.redirect('/login');
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
  app.post('/api/wines/:id', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400)

    const id = req.params.id;
    const previousWines = JSON.parse(fs.readFileSync(wineData));
    const editedWine = _.find(previousWines, function(wine) { return wine.id == id });

    if (editedWine) {
      const index = _.indexOf(previousWines, _.find(previousWines, {id: id}));
      previousWines[index] = req.body;
      fs.writeFile(wineData, JSON.stringify(previousWines));

    } else {
      fs.writeFile(wineData, JSON.stringify([
        ...previousWines,
        req.body
      ]));
    }

    res.status(202);
    res.json(true);
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
        req.body
      ]));
    }

    res.status(202);
    res.end("new category posted");
  })


  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, path.join(__dirname, 'uploads'));
    },

    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now());
    }
  });

  const upload = multer({ storage : storage});

  // Image upload
  app.post('/api/images', upload.single('photo'), function(req, res){
    console.log(req.file);
    return res.json(req.file.filename);
    upload(req, res, function(err) {
      if(err) {
        return res.end("Error uploading file.");
      }
      console.log(req) // I should see image array!
      res.end("msg form express: File is uploaded");
    });
  });

  app.delete('/api/wines/:id', jsonParser, function (req, res) {
    const previous = JSON.parse(fs.readFileSync(wineData));
    const id = req.params.id;
    const updated = _.filter(previous, (wine) => wine.id !== id);

    fs.writeFile(wineData, JSON.stringify(updated));
    res.json(true);
  })

  // Finally, listen to the port
  app.listen(PORT, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Express listening at ' + PORT);
  });
};
