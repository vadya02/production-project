import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
import { BuildOptions } from "./types/config";

export const buildLoaders = (options: BuildOptions): webpack.RuleSetRule[] => {
	const typeScriptLoader = {
		test: /\.tsx?$/,
		use: "ts-loader",
		exclude: /node_modules/,
	};

	const svgLoader = {
		test: /\.svg$/,
		use: ["@svgr/webpack"],
	};

	const fileLoader = {
		test: /\.(png|jpg|gif|woff2|woff)$/,
		use: [
			{
				loader: "file-loader",
				options: {},
			},
		],
	};

	const babelLoader = {
		test: /\.(?:js|mjs|cjs|tsx)$/,
		exclude: /node_modules/,
		use: {
			loader: "babel-loader",
			options: {
				targets: "defaults",
				presets: [["@babel/preset-env"]],
				plugins: [
					[
            "i18next-extract", 
            { 
              nsSeparator: "~",
              locales: ['en', 'ru'] 
            }
          ],
					// […] your other plugins […]
				],
			},
		},
	};

	const styleLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			// Creates `style` nodes from JS strings
			options.isDev ? "style-loader" : MiniCssExtractPlugin.loader,
			// Translates CSS into CommonJS
			{
				loader: "css-loader",
				options: {
					modules: {
						auto: (resPath: string) => Boolean(resPath.includes(".module.")),
						localIdentName: options.isDev
							? "[path][name]__[local]--[hash:base64:5]"
							: "[hash:base64:8]",
					},
				},
			},
			// Compiles Sass to CSS
			"sass-loader",
		],
	};

	return [babelLoader, typeScriptLoader, styleLoader, svgLoader, fileLoader];
};
