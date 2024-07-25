import html from '@rollup/plugin-html';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import vuePlugin from './plugins/rollup-plugin-vue.mjs';
/**
 * @type {import("rollup").RollupOptions}
 */

const rollupConfig = {
  input: './src/main.js',
  output: {
    dir: 'dist',
    format: 'iife',
    sourcemap: true,
    entryFileNames: 'assets/js/[name]-[hash].js',
    chunkFileNames: 'assets/js/[name]-[hash].js',
    assetFileNames: (assetInfo) => {
      if (assetInfo.name.endsWith('.css')) {
        return 'assets/css/[name]-[hash][extname]';
      }
      if (/\.(png|jpe?g|gif|svg|webp)$/.test(assetInfo.name)) {
        return 'assets/images/[name]-[hash][extname]';
      }
      return 'assets/other/[name]-[hash][extname]';
    },
  },
  plugins: [
    // nodeResolve(),
    vuePlugin(),
    html({
      title: 'My Rollup App',
      template: ({ attributes, files, meta, publicPath, title }) => {
        return `
          <!doctype html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>${title}</title>
            </head>
            <body>
              <div id="app"></div>
              ${files.js
                .map(
                  (file) =>
                    `<script src="${publicPath}${file.fileName}"></script>`
                )
                .join('\n')}
            </body>
          </html>
        `;
      },
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
      preventAssignment: true,
    }),
  ],
};

export default rollupConfig;
