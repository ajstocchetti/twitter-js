var express = require("express");
var app = express();
var morgan = require("morgan");

app.use(morgan('dev'));

app.get('/', function(req, res) {
   res.send("Hello Clarise.");
})














app.listen(3000);
