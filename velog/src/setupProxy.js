const { createProxyMiddleware } = require('http-proxy-middleware')


// 프록시설정

module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'http://3.34.178.13', 
      changeOrigin: true,
    })
  )
}

