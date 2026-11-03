const express = require('express');
const path = require('path');
const config = require('./config/appConfig');
const logger = require('./middlewares/logger');
const indexRoutes = require('./routes/index');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRoutes);

app.listen(config.port, () => {
  console.log(`Server Gypsum berjalan di http://localhost:${config.port}`);
});
