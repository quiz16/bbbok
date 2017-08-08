'use strict';

let path    = require( 'path' );
let webpack = require( 'webpack' );

module.exports = {
	'context' : path.resolve( 'src' ),
	'entry' : './app/index.js',
	'output' : {
		'path' : __dirname + '/dist',
		'publicPath' : '/dist',
		'filename' : 'bundle.js'
	},

	'devServer' : {
		'host'             : '0.0.0.0',
		'port'             : 8888,
		'disableHostCheck' : true
	},

	'module' : {
		'loaders' : [
			{
				'test'    : /\.js$/,
				'exclude' : /node_modules/,
				'loaders' : [ 'babel-loader?presets[]=es2015,presets[]=react' ]
			},
			{
				'test'   : /\.html$/,
				'loader' : 'file-loader?name=[name].[ext]'
			},
			{
				'test'   : /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				'loader' : 'url-loader?limit=10000'
			},
			{
				'test'   : /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
				'loader' : 'file-loader'
			},
			{
				'test'    : /(\.scss|\.css)$/,
				'loaders' : [
					'style-loader',
					'css-loader'
				]
			}
		]
	}
};
