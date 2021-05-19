const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");

const middlewares = require("./middleware");
const api = require("./api");
const { checkTokenSetUser } = require("./api/auth");
const app = express();

app.use(morgan("tiny"));
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(checkTokenSetUser);

app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());
app.all("", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  //Auth Each API Request created by user.
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "This Work! 👻 👻 👻 👻 👻 👻" });
});

app.use("/api/v1", api);

//last middleware register!!! for error
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
