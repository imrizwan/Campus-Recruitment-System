var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");

app.use(bodyParser.json());

// support application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Our first route
app.post("/cv", function(req, res) {
  res.json(req.body);
});

// Listen to port 5000
app.listen(5000, function() {
  console.log("Dev app listening on port 5000!");
});
