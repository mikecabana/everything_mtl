console.log("The bot is...botting");

var Twit = require('twit');
var config = require('./config')

var T = new Twit(config);

//setInterval(sendTweet, 1000)

var stream = T.stream('user');
stream.on('follow', followed);

function followed(eventMsg){
    var screenName = eventMsg.source.screen_name;
    console.log(screenName + "has followed you, following back in 5 mins.");
    setTimeout(followTwit(screenName), 1000*60*5); //follow back after 5 minutes
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