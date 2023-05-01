module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
    devServer: {
      proxy: {
        '^/': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    },
}
