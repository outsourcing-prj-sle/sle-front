const { defineConfig } = require('@vue/cli-service');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  configureWebpack: {
    plugins: [
      new ESLintPlugin({
        // 플러그인 생성자를 사용하여 extensions 옵션 설정
        extensions: ['js', 'vue', 'json'],
      }),
    ],
    resolve: {
      alias: {
        '@': require('path').resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        // {
        //   test: /\.vue$/,
        //   loader: 'vue-loader',
        // },
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
          },
          exclude: /node_modules/,
        },
      ],
    },
  },
  devServer: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://devgnesel.itt.link:60080/',
        // target: 'https://5867-138-64-69-84.ngrok-free.app/',
        changeOrigin: true,
      },
    },
  },
});
