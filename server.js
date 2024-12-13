const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();

const proxyOptions = {
  target: 'http://localhost:80', 
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',
  },
};

const apacheProxy = createProxyMiddleware(proxyOptions);

app.use('/api', apacheProxy);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'linkcheck.html'));
});

app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Node.js server is running on http://localhost:3000');
});
