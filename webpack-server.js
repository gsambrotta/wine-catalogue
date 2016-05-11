'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');


module.exports = (PORT) => {

  const expressPort = PORT - 1;
  const server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:' + expressPort 
    }
  });
  
  server.listen(PORT, 'localhost', function (err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Webpack listening at ' + PORT);
  });
};
