const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const path = require("path");
const favicon = require('serve-favicon')

const app = express();

app.use(favicon(path.join(__dirname, '/public/favicon.ico')))
app.use(cors({
  origin: '*'
}))
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use("/api/v1/", (req, res, next) => {
  res.send({
    message: "Welcome To Service Api v1",
    application: "Service",
    apiVersion: "v1",
  })
})
app.route("/api/v1/^/?");

var isProd = process.env.NODE_ENV === "production";
var port = process.env.PORT || 3500;

if (isProd) {
  app.use(express["static"](path.join(__dirname, "../rlayers/build")));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../rlayers/build", "index.html"));
  });
}

var serverApps = app.listen(port, function () {
  if (isProd) {
    return console.log(
      "server started at http://localhost:" + port + "/api/v1/",
    );
  } else {
    return console.log(
      "server started at http://localhost:" + port + "/api/v1/",
    );
  }
});

serverApps.keepAlive = true;
