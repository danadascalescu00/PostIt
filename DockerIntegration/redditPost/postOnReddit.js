const request = require('request')

const KIND = 'self'
const subreddit = 'test'
const PostURL = 'https://oauth.reddit.com/api/submit'


exports.postOnReddit = (accessToken, title, message, cb) => {

    headers = {
        'User-Agent': 'text/plain',
        'Authorization': `bearer ${accessToken}`
    }
        
    body = `kind=${KIND}&sr=${subreddit}&title=${title}&text=${message}`

    requestInfo = {
        headers: headers, 
        url: PostURL, 
        body: body
    }

    request.post(requestInfo, function(error, response, body) {
        if (error) console.log(error)
        cb(message)
    });
}
