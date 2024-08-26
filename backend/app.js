require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

require('./models/connection');
const usersRouter = require('./routes/users');
const announcesRouter = require('./routes/announces');
const toursRouter = require("./routes/tours")
const showsRouter = require("./routes/shows")

const app = express();
const fileUpload = require('express-fileupload');
app.use(fileUpload());

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/', announcesRouter);
app.use('/tours', toursRouter)
app.use('/shows', showsRouter)

module.exports = app;
