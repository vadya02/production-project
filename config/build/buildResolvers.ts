import webpack from 'webpack';
import { BuildOptions } from './types/config';

export const buildResolvers = (options: BuildOptions): webpack.ResolveOptions => ({
    extensions: ['.tsx', '.ts', '.js'],
    preferAbsolute: true, // абсолютные пути в приоритете
    modules: [
        options.paths.src, 'node_modules',
    ],
    alias: {
        '@': options.paths.src,
    },
    mainFiles: ['index'],
});
