var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//custom endpoints
getClassesRouter = require ("./routes/getClasses");
getLecturesRouter = require ("./routes/getLectures");
getNotesRouter = require ("./routes/getNotes");
addClassRouter = require ("./routes/addClass");
addLectureRouter = require ("./routes/addLecture");
addNoteRouter = require ("./routes/addNote");
updateVoteRouter = require ("./routes/updateVote");
addContentRouter = require ("./routes/addContent");
getMainRouter = require ("./routes/getMain");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/getClasses", getClassesRouter);
app.use("/getNotes", getNotesRouter);
app.use("/getLectures", getLecturesRouter);
app.use("/addClass", addClassRouter);
app.use("/addLecture", addLectureRouter);
app.use("/addNote", addNoteRouter);
app.use("/updateVote", updateVoteRouter);
app.use("/getMain", getMainRouter);
app.use("/addContent", addContentRouter);

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
