const request = require('request')

const FACEBOOK_APP_ID = '614936155905378'
const FACEBOOK_APP_SECRET = '0acfc566eacc72b4d28ae5c6340a079a'


postMessageOnPage = (pageId, pageAccessToken, message, cb) => {
    postURL = `https://graph.facebook.com/` +
        `${pageId}/feed?` +
        `message=${message}&` +
        `access_token=${pageAccessToken}`

    request.post(postURL, (error, res, body) => {
        try {
            console.log(body)
        } catch (e) {
            console.error("Failed to post on FACEBOOK")
            console.error(error)
        } finally {
            return cb(res)
        }
    })
}

exports.postMessageOnPages = async (pageList, message, cb) => {

    let posts = pageList.map(page => {
        return new Promise(resolve => {
            if (page.canPost)
            postMessageOnPage(
                page.pageId, page.pageAccessToken, message, resolve
            )
        })
    })
    
    Promise
    .all(posts)
    .then(res => { return cb(res) })
    .catch(error => { return cb(null) })

}
  
exchangeForPageAccessToken = (pageId, userAccessToken, cb) => {
    pageAccessTokenURL = `https://graph.facebook.com/` +
        `${pageId}?access_token=${userAccessToken}&fields=access_token`

    request.get(pageAccessTokenURL, (error, res, body) => {
        try {
            return cb(JSON.parse(body).access_token)
        } catch {
            console.error("Failed to get PAGE ACCESS TOKEN")
            console.error(error)
            return cb(null)
        }
    })
}
  
exchangeForLongLivedAccessToken = (shortLivedUserAccessToken, cb) => {
    longLivedAccessTokenURL = `https://graph.facebook.com/oauth/` +
        `access_token?grant_type=fb_exchange_token&` +
        `client_id=${FACEBOOK_APP_ID}&` +
        `client_secret=${FACEBOOK_APP_SECRET}&` + 
        `fb_exchange_token=${shortLivedUserAccessToken}`
  
    request.get(longLivedAccessTokenURL, (error, res, body) => {
        try {
            return cb(JSON.parse(body).access_token)
        } catch {
            console.error("Failed to get LONG_LIVED USER ACCESS TOKEN")
            console.error(error)
            return cb(null)
        }
    })
}

exchangeUserTokenForPageToken = (pageId, userAccessToken, cb) => {
    exchangeForLongLivedAccessToken(userAccessToken, (longLivedAccessToken) => {
        // console.log(`Got llaccesstoken: ${longLivedAccessToken}`)
        if (longLivedAccessToken) {
            exchangeForPageAccessToken(pageId, longLivedAccessToken, (pageToken) => {
                // console.log(`got page access token: ${pageToken}`)
                return cb(pageToken)
            })
        }
    })
}

exports.getAllPages = (facebookUserId, accessToken, cb) => {
    pagesUrl = `https://graph.facebook.com/` +
        `v6.0/${facebookUserId}/accounts?` +
        `type=page&access_token=${accessToken}`

    request.get(pagesUrl, (error, res, body) => {
            result = []
            // console.log(JSON.parse(res.body).data.length)
            for (pageInfo of JSON.parse(res.body).data)  {
                exchangeUserTokenForPageToken(pageInfo.id, accessToken, (pageToken) => {
                    result.push({
                        canPost: false, 
                        pageId: pageInfo.id,
                        name: pageInfo.name, 
                        pageAccessToken: pageToken
                    })
                    
                    if (result.length == JSON.parse(res.body).data.length) {
                        result[0].canPost = true
                        cb(result)
                    }
                })
            }
    })
}

exports.run = (pageId, message, accessToken) => {
    postMessageOnPage(pageId, pageAccessToken, message)
}

exports.reloadToken = (shortLivedUserAccessToken) => {
    exchangeForLongLivedAccessToken(shortLivedUserAccessToken)
}



/*
// const someProcedure = async n =>{
    //     for (let i = 0; i < n; i++) {
    //     const t = Math.random() * 1000
    //     const x = await new Promise(resolve => setTimeout(resolve, t, i))
    //     console.log (i, x)
    //     }
    //     return 'done'
    // }

    // someProcedure(10).then(x => console.log(x)) // => Promise
    // 0 0
    // 1 1
    // 2 2
    // 3 3
    // 4 4
    // 5 5
    // 6 6
    // 7 7
    // 8 8
    // 9 9
    // done
     // await new Promise(resolve => {
            //     postMessageOnPage( page.pageId, 
            //         page.pageAccessToken, message, (response) => {
            //             resolve("posted")
            //     })
            // })
    // const postSync = async () => {
    //     let promises = []
    //     for (page of pageList) {
    //         console.log("REZOLVEEED")
    //                     console.log(page.pageId, message)
    //         promises.push(postMessageOnPage(
    //             page.pageId, 
    //             page.pageAccessToken, 
    //             message
    //         ))
    //     }
    //     return Promise.all(promises)
    // }
    // console.log("before func")
    // const postSync = async () => {
    //     for (page of pageList) {
    //         console.log("before first for item")
    //         await new Promise(resolve => {
    //             console.log("inside promise")
    //             postMessageOnPage(page.pageId, 
    //                 page.pageAccessToken, message, (response) => {
    //                     console.log("REZOLVEEED")
    //                     console.log(page.pageId, message)
                        
    //             })
    //             resolve("posted")
    //             console.log("jumped over")
    //         })
    //     }
    // }
    // postSync().then(results => { return cb(results) }).catch(error => { return cb(null) })
*/
