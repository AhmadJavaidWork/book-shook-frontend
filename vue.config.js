const path = require('path');
module.exports = {
  transpileDependencies: ['vuetify'],
  // The basic URL when deploying the application package is the same as the output.publicPath of webpack itself
  publicPath: './',
  // Output file directory
  outputDir: 'dist',
  // Whether eslint-loader checks when saving
  lintOnSave: true,
  // Whether to use the Vue build version that includes the runtime compiler
  runtimeCompiler: false,
  // Whether the sourceMap file is generated in the production environment
  productionSourceMap: false,
  // Enable Subresource Integrity (SRI) on the <link rel="stylesheet"> and <script> tags in the generated HTML
  integrity: false,
  // webpack related configuration
  chainWebpack: (config) => {
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', path.resolve(__dirname, './src'));
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // Production Environment
      config.mode = 'production';
    } else {
      // Development environment
      config.mode = 'development';
    }
  },
  // Whether to use thread-loader
  parallel: require('os').cpus().length > 1,
  // PWA plug-in related configuration
  pwa: {},
  // webpack-dev-server related configuration
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false,
    // http proxy configuration
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
    before: (app) => {},
  },
  // Third-party plug-in configuration
  pluginOptions: {},
};
