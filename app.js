var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const PORT = 3000;
const User = require('./models/User');

var indexRouter = require('./routes/index');
var cadastroRouter = require('./routes/cadastro');
var cursosRouter = require('./routes/cursos');
var entrarRouter = require('./routes/entrar');
var sobreRouter = require('./routes/sobre');

var app = express();

mongoose
  .connect('mongodb+srv://nap:Quezado2005@cluster.djaieht.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida.');
  })
  .catch((err) => {
    console.error('Erro na conexão com o MongoDB:', err);
  });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/cadastro', cadastroRouter);
app.use('/cursos', cursosRouter);
app.use('/entrar', entrarRouter);
app.use('/sobre', sobreRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
