var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');


module.exports = (PORT) => {
  const backendPort = PORT - 1;

  const server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    proxy: {
    '/api': 'http://localhost:' + backendPort
    }
  });
  
  server.listen(PORT, 'localhost', function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('Listening at ' + PORT);
  });
}
