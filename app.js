var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const Event = require('./models/event');
const dotenv = require('dotenv');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

dotenv.config();
var app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// API 1: Aggiungi un'email a una lista
app.post('/add-subscription', async (req, res) => {
  const { identifier, email, name, phone } = req.body;

  if (!identifier || !email) {
    return res.status(400).send({ error: 'identifier ed email sono richiesti' });
  }

  try {
    const event = await Event.findOneAndUpdate(
      { identifier },
      { $addToSet: { subscribers: { email, nome: name, telefono: phone } } },  // Evita duplicati
      { new: true, upsert: true }        // Crea se non esiste
    );
    res.status(200).send(event);
  } catch (err) {
    res.status(500).send({ error: 'Errore durante l\'aggiornamento', details: err });
  }
});

// API 2: Leggi un documento tramite identifier
app.get('/get-event/:identifier', async (req, res) => {
  const { identifier } = req.params;
  console.log("????",identifier);
  

  try {
    const event = await Event.findOne({ identifier });
    console.log("????",event);
    if (!event) {
      return res.status(404).send({ error: 'Evento non trovato' });
    }
    res.status(200).send(event);
  } catch (err) {
    res.status(500).send({ error: 'Errore durante il recupero', details: err });
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
