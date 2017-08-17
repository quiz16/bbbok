'use strict';

const path    = require( 'path' );
const webpack = require( 'webpack' );

const ENV = process.env.npm_lifecycle_event;

let isProd = ENV === 'build';

module.exports = function webpackConf () {
	let config = {
		'context' : path.resolve( 'src' ),
		'entry' : {
			'main' : [ 'babel-polyfill', '../index.html', './app/index.js' ],
			'vendor' : [ 'lodash', 'react', 'react-redux', 'react-router', 'react-router-redux' ]
		},
		'output' : {
			'path'     : __dirname + '/dist',
			'filename' : '[name].bundle.js'
		},
		'module' : {
			'loaders' : [
				{
					'test'    : /\.js$/,
					'exclude' : /node_modules/,
					'loader' : 'babel-loader',
					'query' : {
						'presets' : [ 'es2015', 'react', 'stage-0' ]
					}
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

	config.devtool = isProd ? 'source-map' : 'eval';

	config.devServer = isProd ? {} : {
		'host'             : '0.0.0.0',
		'port'             : 8888,
		'disableHostCheck' : true
	};

	config.plugins = !isProd ? [] : [
		new webpack.optimize.CommonsChunkPlugin( {
			'name' : 'vendor'
		} ),
		new webpack.DefinePlugin( {
			'process.env': {
				'NODE_ENV': JSON.stringify( 'production' ),
			},
		} ),
		new webpack.LoaderOptionsPlugin( {
			'minimize' : true,
			'debug'    : false
		} ),
		new webpack.optimize.UglifyJsPlugin( {
			'minimize' : true,
			'beautify' : false,
			'mangle' : true,
			'compress' : {
				'warnings' : false,
				'pure_getters' : true,
				'unsafe' : true,
				'unsafe_comps' : true,
				'screw_ie8' : true
			},
			'exclude' : [ /\.min\.js$/gi ],
			'comments' : false,
			'sourceMap' : true
		} ),
		new webpack.NoEmitOnErrorsPlugin()
	];

	return config;
}();
