// server.js
var express = require("express");
var path = require("path");
var fs = require("fs");
var MongoClient = require("mongodb").MongoClient;
var bodyParser = require("body-parser");
var app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/get-profile", function (req, res) {
  var response = res;

  MongoClient.connect(
    "mongodb://admin:password@localhost:27017",
    function (err, client) {
      if (err) throw err;

      var db = client.db("user-account");
      var query = { userid: 1 };

      db.collection("users").findOne(query, function (findErr, result) {
        if (err) throw err;
        client, close();
        response.send(result);
      });
    }
  );
});

app.post("/update-profile", function (req, res) {
  var userObj = req.body;
  var response = res;
  console.log("Connecting to the db...");

  MongoClient.connect(
    "mongodb://admin:password@localhost:27017",
    function (err, client) {
      if (err) throw err;

      var db = client.db("user-account");
      userObj["userid"] = 1;
      var query = { userid: 1 };
      var newvalues = { $set: userObj };

      consolw.log("Successfully connected to the db...");

      db.collection("users").updateOne(
        query,
        newValues,
        { upsert: true },
        function (findErr, result) {
          if (err) throw err;
          console.log("Successfully updated or inserted ...");
          client, close();
          response.send(result);
        }
      );
    }
  );
});

app.listen(3000, function () {
  console.log("App started on port 3000");
});
