var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  return res.send({ error: true, message: "Test ebooks Web API" });
});

var dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mbeok",
});

dbConn.connect();

app.get("/allebook", function (req, res) {
  dbConn.query("SELECT * FROM ebooks", function (error, results, fields) {
    if (error) throw error;
    return res.send(results);
  });
});

app.post("/ebk", function (req, res) {
  var ebook = req.body;

  if (!ebook) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide ebooks " });
  }

  dbConn.query(
    "INSERT INTO ebooks SET ? ",
    ebook,
    function (error, results, fields) {
      if (error) throw error;
      return res.send(results);
    }
  );
});

//set port
app.listen(3000, function () {
  console.log("Node app is running on port 3000");
});

module.exports = app;