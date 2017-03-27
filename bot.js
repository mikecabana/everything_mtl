console.log("The bot is...botting");

var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);

var stream = T.stream('user');

//stream.on('follow', followed);
/*function followed(eventMsg){
    var screenName = eventMsg.source.screen_name;
    console.log(screenName + " has followed you, following back in 5 mins.");
    setTimeout(followTwit(screenName), 1000*60*5); //follow back after 5 minutes
}*/
var retext = "One stop shop to everything montreal #mtl #montreal #news #sports #arts #music #schools #metro #culture #events #food #trends #tech #450";
setInterval(function(){ sendTweet(retext) }, 1000*60*2);

stream.on('tweet', listupdated);

function listupdated(eventMsg){
    var tweetid = eventMsg.id_str;
    var tweetUserId = eventMsg.user.id_str;
    //console.log(eventMsg.id);
    if(tweetUserId != "844775593531006976"){
         retweet(tweetid);
    }
   
}




//to retweet
function retweet(tweetid){
     var tweet = {
        id: tweetid
    }

    T.post('statuses/retweet/:id', tweet,  retweeted); 

    function retweeted (err, data, response) {
        if(err) {
            console.log(err);
        }else{
            console.log("You re-tweeted!");
        }
    }
}

//to follow user
function followTwit(text){
    var user = {
        screen_name: text
    }

    T.post('friendships/create', user, followed);

    function followed(err, data, response){
        if(err) {
            console.log(err);
        }else{
            console.log("Followed "+text+"!");
        }
    }
}

//to search for tweets
function searchTweets(text) {
    var params = { 
        q : text,
        count: 10
    }

    T.get('search/tweets', params, gotData);

    function gotData(err, data, response) {
        var tweets = data.statuses;
        for (var i = 0; i < tweets.length; i++){
            console.log(tweets[i].text);
            console.log("========================");
        }
    }
}

//to tweet
function sendTweet(text) {
    var tweet = {
        status: text
    }

    T.post('statuses/update', tweet, tweeted);

    function tweeted (err, data, response) {
        if(err) {
            console.log(err);
        }else{
            console.log("You tweeted!");
        }
    }
}