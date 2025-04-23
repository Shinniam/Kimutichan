const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const compression = require('compression');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(compression());

// Google風検索UI
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(`
    <html>
      <head><title>Prox</title></head>
      <body style="text-align:center;">
        <form method="GET" action="/search">
          <input name="q" style="width:300px; padding:8px;" placeholder="Search...">
          <button type="submit">Search</button>
        </form>
      </body>
    </html>
  `);
});

// Google検索にリダイレクト
app.get('/search', (req, res) => {
  const q = req.query.q;
  res.redirect(`https://www.google.com/search?q=${encodeURIComponent(q)}`);
});

// 任意サイトのプロキシ (例: /proxy?url=https://tracker.gg)
app.use('/proxy', (req, res, next) => {
  const target = req.query.url;
  if (!target) return res.status(400).send('Missing URL');

  return createProxyMiddleware({
    target,
    changeOrigin: true,
    secure: false,
    selfHandleResponse: false,
    pathRewrite: () => '',
    onProxyRes: (proxyRes, req, res) => {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
    }
  })(req, res, next);
});

app.listen(3000, () => console.log('Prox running on http://localhost:3000'));
