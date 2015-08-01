var express = require('express');
var tweetBank = require('../tweetBank');

//module.exports = router;
module.exports = function(io) {
   var router = express.Router();

   router.get('/', function (req, res) {
     var tweets = tweetBank.list();
     res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
   });

   router.get('/users/:name', function(req, res) {
     var name = req.params.name;
     var list = tweetBank.find( {name: name} );
     res.render( 'index',
                  { title: 'Twitter.js - Posts by '+name,
                  tweets: list,
                  showForm:true,
                  nameForm: true,
                  name: name } );
   });

   router.get('/users/:name/tweets/:tweetID', function(req, res) {
      var name = req.params.name;
      var tweetID = req.params.tweetID;
      var tweet = tweetBank.find( { name: name, id: tweetID} );
      res.render( 'index', { title: "Twitter.js - Post #"+tweetID, tweets: tweet } );
   });

   router.post('/submit', function(req, res) {
      var name = req.body.name;
      var text = req.body.text;
      var newTweetID = tweetBank.add(name, text).toString();
      var newTweet = tweetBank.find( { id: newTweetID } );

      var newDiv = express.render('tweetMacro', newTweet[0]);
      console.log(newDiv);

      // let everybody else know that there are new tweets
      io.sockets.emit('new_tweet', newTweet[0]);

      // finally send the poster somewhere
      res.redirect('/');
   });

   return router;
}
