require('dotenv').config();
const express = require('express');
const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'/src/views'));
const mainRouter = require('./src/routes/main.routes');
app.use(mainRouter);
app.use('/productos',require('./src/routes/productos.router'));
app.use('/usuarios',require('./src/routes/usuarios.router'));
app.use('/carrito',require('./src/routes/carrito.router'));
const port = process.env.PORT || 3001;
app.listen(port, () =>console.log(`http://localhost:${port}`));