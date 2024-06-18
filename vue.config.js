const { defineConfig } = require('@vue/cli-service');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  configureWebpack: {
    plugins: [
      new ESLintPlugin({
        // 플러그인 생성자를 사용하여 extensions 옵션 설정
        extensions: ['js', 'vue'],
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
    proxy: {
      '/api': {
        target: 'http://1.242.49.61:12000',
        changeOrigin: true,
      },
    },
  },
});
