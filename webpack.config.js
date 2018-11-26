const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const src = './src/';
const dist = path.join(__dirname, 'dist');

module.exports = {
    entry: './src/app.js',
    output: {
		path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
		publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
				use: {
					loader: "babel-loader"
			}},
				{
				test: /\.*css$/,
				use: ExtractTextPlugin.extract(
				  {  
					fallback: 'style-loader',
					use: ['css-loader','sass-loader']
				  })
			  }
            
        ]
    },
	devServer: {
		 contentBase: path.join(__dirname, 'dist')
	},
	plugins: [
	 new CopyWebpackPlugin([{from: './src/index.html', to:'./'},{from: './src/assets/', to:'./assets/'}]),
	 new ExtractTextPlugin({
     filename: 'css/main.css'
 })
	],
	node: {
  fs: 'empty',
  net: 'empty',
  tls: 'empty'
	}
	
	
};


