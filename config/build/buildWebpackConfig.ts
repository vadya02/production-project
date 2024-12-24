import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/config";

export const buildWebpackConfig = (options: BuildOptions): webpack.Configuration => {
  const {mode, paths} = options
  return {
    mode,
    entry: {
      random_entry: paths.entry,
    },
    output: {
      filename: '[name].[contenthash].js',
      path: paths.build,
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options)
    },
    devtool: options.isDev ? 'inline-source-map' : undefined,
    resolve: buildResolvers(options),
    devServer: options.isDev ? buildDevServer(options) : undefined,
  }
}