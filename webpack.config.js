const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const sass = require( 'sass' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

module.exports = {
	...defaultConfig,

	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
	module: {
		...defaultConfig.module,
		rules: [
			// ...defaultConfig.module.rules,
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@wordpress/babel-preset-default' ],
					},
				},
			},
			{
				test: /\.scss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: false,
						},
					},
					{
						loader: 'resolve-url-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							postcssOptions: {
								plugins: [ [ 'postcss-preset-env' ] ],
							},
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							implementation: sass,
							sassOptions: {
								includePaths: [
									'src/scss',
									'src',
									'node_modules/@university-of-missouri/mizzou-design-system/src/scss',
									'node_modules/@university-of-missouri/mizzou-design-system/src',
								],
							},
						},
					},
				],
			},
		],
	},

	resolve: {
		...defaultConfig.resolve,
		alias: {
			Components: path.resolve(
				__dirname,
				'node_modules/@university-of-missouri/mizzou-design-system/dist/es5/components/'
			),
			Layers: path.resolve(
				__dirname,
				'node_modules/@university-of-missouri/mizzou-design-system/dist/es5/components/Layers/'
			),
		},
		extensions: [ '.tsx', '.ts', '.jsx', '.js', '...' ],
		modules: [ 'src', 'node_modules' ],
	},
};
