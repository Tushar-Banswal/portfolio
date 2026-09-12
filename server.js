const express = require('express');
const { Liquid } = require('liquidjs');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const root = __dirname;
const engine = new Liquid({ root, extname: '.html', cache: process.env.NODE_ENV === 'production' });

app.engine('html', engine.express());
app.set('views', root);
app.set('view engine', 'html');
app.use('/assets', express.static(path.join(root, 'assets')));

async function loadPortfolio() {
  return JSON.parse(await fs.readFile(path.join(root, 'portfolio.config.json'), 'utf8'));
}

app.get('/', async (_req, res, next) => {
  try { res.render('index', await loadPortfolio()); } catch (error) { next(error); }
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).send('Unable to render the portfolio. Check portfolio.config.json.');
});

app.listen(port, () => console.log(`Portfolio running at http://localhost:${port}`));
