const snoowrap = require('snoowrap')

// Create a new snoowrap requester with OAuth credentials.


// Submitting text to a subreddit


exports.postMessageOnReddit = (accessToken, message, cb) => {

    const r = new snoowrap({
        userAgent: 'helpful poster',
        clientId: '0ojMzPpxLoCkSA',
        clientSecret: 'Su6skWQoqGy4k3a-S9bh93LXR_w',
        refreshToken: '465515612250-Q4mneitsYJkYcrwsM4-SkGLmbV4'
    });

    r.getSubreddit('test').submitSelfpost(
        {title: 'Test posted with node2', 
        text: 'Hello world2!'}
    ).then(result => {
        cb(result)
    })
}

  
