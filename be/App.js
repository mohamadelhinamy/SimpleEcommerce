const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const mongoose = require('mongoose');
var mongo = require('mongodb');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/simpleECommerce');
var db = mongoose.connection;
const port = 3000;
const admin = require('./routes/admin');
const productCategory = require('./routes/productCategory');
const product = require('./routes/product');
const user = require('./routes/user');
const order = require('./routes/order');

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json({ limit: '100mb' }));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static('files'));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/admins', admin);
app.use('/productCategories', productCategory);
app.use('/products', product);
app.use('/users', user);
app.use('/orders', order);

app.get('*', function(req, res) {
  res.status(404).send('ERROR 404');
});

app.listen(port, () => console.log(`ECommerce app listening on port ${port}!`));
module.exports = app;
