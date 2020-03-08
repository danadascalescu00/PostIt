const { FB, FacebookApiException } = require('fb')

const FACEBOOK_APP_ID = '1119034428300585'
const FACEBOOK_APP_SECRET = 'fd6fd8a28a8110661c6a768e1a0ea239'

var accessToken = undefined
var fooApp = FB.extend({
				appId: FACEBOOK_APP_ID,
				appSecret: FACEBOOK_APP_SECRET
			})

fooApp.options({version: 'v2.4'});


// to obtain acces token you have to perform a GET request at
// 	terminal$ curl -X GET "https://graph.facebook.com/oauth/access_token
//		   		?client_id={your-app-id}
//		   		&client_secret={your-app-secret}
//   			&grant_type=client_credentials"
// FB.setAccessToken('1119034428300585|3Cu3-XKL8JtVUE9wkMHh4DUPZlw');

getData = () => {
	FB.api('oauth/access_token', {
	    client_id: FACEBOOK_APP_ID,
	    client_secret: FACEBOOK_APP_SECRET,
	    grant_type: 'client_credentials', 
	    scope: ["manage_pages", "public_profile" ,"read_insights,pages_show_list"]
	}, function (res) {
	    if(!res || res.error) {
	        console.log(!res ? 'error occurred' : res.error);
	        return;
	    }
	    
	    try { 
	    	fooApp.setAccessToken(res.access_token);
			fooApp.api(FACEBOOK_APP_ID, function (res) {
			 	if(!res || res.error) {
					console.log(!res ? 'error occurred' : res.error);
			   		return;
			  	}
			 	console.log(res.id);
			 	console.log(res.name);
			});
		} catch(error) {
			console.log("Error")
		}
	})
}
getData()

// FB.setAccessToken('1119034428300585|3Cu3-XKL8JtVUE9wkMHh4DUPZlw');
// var message = 'Hi from facebook-node-js';
// FB.api('', 'post', {
//     batch: [
//         { method: 'post', relative_url: 'me/feed', body:'message=' + encodeURIComponent(message) }
//     ]
// }, function (res) {
//     var res0;

//     if(!res || res.error) {
//         console.log(!res ? 'error occurred' : res.error);
//         return;
//     }

//     res0 = JSON.parse(res[0].body);

//     if(res0.error) {
//         console.log(res0.error);
//     } else {
//         console.log('Post Id: ' + res0.id);
//     }
// });


// requestAccessToken().then(getData())
// curl -X GET "https://graph.facebook.com/oauth/access_token?client_id=1119034428300585&client_secret=fd6fd8a28a8110661c6a768e1a0ea239&grant_type=client_credentials"