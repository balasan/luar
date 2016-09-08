var path = require('path');
var webpack = require('webpack');


module.exports = {
  devtool: 'inline-source-map',
  entry: [
    './js/entry.js'
  ],
  output: {
    path: path.join(__dirname, '/'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  // postcss: function() {
  //   return [easings, autoprefixer, precss];
  // },
  module: {
    loaders: [
      { test: /\.(glsl|frag|vert)$/, loader: 'raw', exclude: /node_modules/ },
      { test: /\.(glsl|frag|vert)$/, loader: 'glslify', exclude: /node_modules/ }
      // test: /\.css$|\.scss$/,
      // loader: 'style-loader!css-loader!postcss-loader'
      // loader: ExtractTextPlugin.extract('style-loader','css-loader!postcss-loader')
      // loader: 'css?sourceMap!postcss!sass?sourceMap&sourceMapContents',
    ]
  }
};

