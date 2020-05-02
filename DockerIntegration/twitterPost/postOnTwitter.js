var Twitter = require('twitter');

const TWITTER_APP_ID = 'my7Xr8xjZ1gJHUZWqganSOAw7';
const TWITTER_APP_SECRET = 'KnRgGcD4SM3J8MhwfYcW4aRPGwNFNPd47jUxa1MSwJktLGhdcs';

exports.postOnTwitter = async (token, tokenSecret, tweetContent, cb) => {

    const client = new Twitter({
        consumer_key: TWITTER_APP_ID,
        consumer_secret: TWITTER_APP_SECRET,
        access_token_key: token,
        access_token_secret: tokenSecret
    });

    client.post('statuses/update', {status: tweetContent},  function(error, tweet, response) {
        if (error) throw error
        console.log(tweet)
        delete this
        cb(response)
    });
      
}