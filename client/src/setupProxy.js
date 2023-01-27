// eslint-disable-next-line import/no-extraneous-dependencies
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:80/api',
      changeOrigin: true,
      ws: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  )
  // app.use(
  //   '/photo',
  //   createProxyMiddleware({
  //     // target: 'http://localhost:8098',
  //     target:
  //       'https://betera-optools-stage-shares.s3.dualstack.eu-central-1.amazonaws.com',
  //     // 'https://stage-by-optools.s3.dualstack.eu-central-1.amazonaws.com',
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/photo': '',
  //     },
  //   })
  // )
}
