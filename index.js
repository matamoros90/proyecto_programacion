require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
const mainRouter = require('./src/routes/main.routes');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use('/', mainRouter);
app.get('/health', (req, res) => res.send('ok'));
app.get('/health/db', async (req, res) => {
  try {
    const r = await require('./src/models/db').query('select now() as now');
    res.json({ ok: true, now: r.rows[0].now });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
});


app.use('/fisica',  require('./src/routes/fisica.router'));


const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`http://localhost:${port}`));
