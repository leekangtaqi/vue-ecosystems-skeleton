process.env.NODE_ENV = 'production'

var webpack = require('webpack')
var webpackConfig = require('./webpack.test.conf')

webpack(webpackConfig, function (err, stats) {
	console.warn(`[err]: ${err}`);
})
