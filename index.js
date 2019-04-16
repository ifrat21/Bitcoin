//jshint esversion:6

var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");

var route = express();

route.use(bodyParser.urlencoded({
  extended: true
}));

route.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

route.post("/", function(req, res) {

  var crypto= req.body.crypto;
  var fiat= req.body.fiat;
  var myUrl="https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  var finalUrl= myUrl+ crypto+fiat;
  request(finalUrl, function(error, response, body) {
    var data = JSON.parse(body); //convert json data into js object
    var price = data.last;
    console.log(price);

    res.send("<h1> the rate of last price  " + crypto  +"is "+ price  + fiat + "</h1>");

    //console.log(body);
  });
});

route.listen(3000, function() {
  console.log("my page is now running at port 3000");
});
