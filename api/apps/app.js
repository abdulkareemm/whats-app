const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const createHttpError = require("http-errors");
const routers = require("../routes");
const db = require("../configs/db");

require("dotenv").config();

//  connect to database
db();

//  create express app
const app = express();

//  morgan
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//  helmet
app.use(helmet());

//  parse json request url
app.use(express.json());

//  parse json request body
app.use(express.urlencoded({ extended: true }));

//  sanitize request data
app.use(mongoSanitize());

//  cookie parser
app.use(cookieParser());

// gzip compression
app.use(compression());

//  file upload
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//  cors
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//  routes
app.use("/api/v1", routers);

//  page not fount
app.use(async (req, res, next) => {
  next(createHttpError.NotFound("This route does not exist."));
});

//  error handling
app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      status: err.status || 500,
      msg: err.message,
    },
  });
});

module.exports = app;
