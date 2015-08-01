var express = require("express");
var app = express();
var morgan = require("morgan");
var swig = require('swig');
var routes = require('./routes/');
var bodyParser = require('body-parser');
var socketio = require('socket.io');

// set up logging
app.use(morgan('dev'));
// turn off cache
swig.setDefaults({ cache: false });
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', process.cwd() + "/views");
app.use(express.static(__dirname + '/public'));

var server = app.listen(3000);
var io = socketio.listen(server);

app.use('/', routes(io));
// app.get('/', function(req, res) {
//    var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
//    res.render( 'index', {title: 'Hall of Fame', people: people } );
// })
