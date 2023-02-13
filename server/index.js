const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const path = require("path");
const favicon = require('serve-favicon')

const routeApi = require('./routers/routeApi')
const locationApi = require('./routers/locIdApi')
const storeData = require('./routers/storeData')

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


app.use("/api/v1/route-google/", routeApi)
app.use("/api/v1/loc-id/", locationApi)
app.use("/api/v1/store-data/", storeData)
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

serverApps.keepAlive = true
// console.log(serverApps, "server apps")
