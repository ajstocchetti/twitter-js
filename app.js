var express = require("express");
var app = express();
var morgan = require("morgan");
var swig = require('swig');
var routes = require('./routes/');

swig.setDefaults({ cache: false });

app.use(morgan('dev'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', process.cwd() + "/views");
app.use(express.static(__dirname + '/public'));
app.use('/', routes);
// app.get('/', function(req, res) {
//    var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
//    res.render( 'index', {title: 'Hall of Fame', people: people } );
// })





app.listen(3000);
