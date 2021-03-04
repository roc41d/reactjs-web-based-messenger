const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const logger = require("morgan");
const db = require("./db");
const auth = require("./middleware/auth");

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");

const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");

const chatRouter = require("./routes/chatRouter");

const { json, urlencoded } = express;

// load env
dotenv.config();

const app = express();

// init mongodb connection
db.connect(app);

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/ping", pingRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/room", chatRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
