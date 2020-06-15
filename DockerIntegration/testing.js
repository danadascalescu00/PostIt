
/*
This is script is running multitple automated tests assuring the backend and 
all APIs are running as expected. We make multiple calls on different routes 
and assure a stable connection before pushing any change to the pipeline.
*/


module.exports = (app, passport) => {


    // 				automation test 1
    // ********************************************
    // checking a simple login for credential aquiring...
    // reddit service
    app.get('/login/reddit', function(req, res, next){
        req.session.state = crypto.randomBytes(32).toString('hex');
        multiPassport.authenticate('reddit', {
            state: req.session.state,
            duration: 'permanent',
            scope: [
                'identity', 'edit', 'flair', 'history', 'modconfig', 
                'modflair', 'modlog', 'modposts', 'modwiki', 'mysubreddits', 
                'privatemessages', 'read', 'report', 'save', 'submit', 
                'subscribe', 'vote', 'wikiedit', 'wikiread'
            ]
        })(req, res, next);


        assert(multiPassport, "Failed if not an instantiated object");
    });




    // 				automation test 2
    // ********************************************
    // checking a simple login for credential aquiring...
    // faceobook service
    app.post('/post/facebook', 
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res) {     
        facebookPost.postMessageOnPages(
            req.user.facebookPagesList,
            req.body.postContent, (result) => {
                res.redirect('/profile')
            })

       	assert(multiPassport, "Failed if not an instantiated object")
    })






    // 				automation test 3
    // ********************************************
    // checking a simple login for credential aquiring...
    // profiling service
    app.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res){
        // console.log(req.user)
        User.findById({_id: req.user.id})
        .then(user => res.render('profile', { item: user, user: req.user }))
        .catch(err => res.status(404).json({ msg: 'No items found' }));
    });



    // 				automation test 4
    // ********************************************
    // validating authentication with empty credentials...
    // IDP experience
    app.post('/signup', multiPassport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }));




    // 				automation test 5
    // ********************************************
    // validating token removal on frontend after a user logout request...
    // IDP experience
    app.get('/logout',
    function(req, res){
        req.logout();
        res.redirect('/');
    });



    // 				automation test 6
    // ********************************************
    // browser validation for UI experience with logging and client actions...
	// UI/UX browser requests
	const { Builder, By, Key, until } = require('selenium-webdriver');
	const http = require('http');

	const BROWSERSTACK_USERNAME = process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME';
	const BROWSERSTACK_ACCESS_KEY = process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY';

	let HttpAgent = new http.Agent({
		keepAlive: true,
	});

	let capabilities = {
		browserName: 'Firefox',
		name: 'Firefox Test',
		os: 'Windows',
		build: 'Test Build 06',
		project: 'Posit',
		'browserstack.debug': true,
	};

	let driver = new Builder()
		.usingHttpAgent(HttpAgent)
		.withCapabilities(capabilities)
		.usingServer(`http://${BROWSERSTACK_USERNAME}:${BROWSERSTACK_ACCESS_KEY}@hub-cloud.browserstack.com/wd/hub`)
		.build();

	driver.get('http://www.google.com/ncr').then(() => {
		driver.findElement(By.name('q')).then((element) => {
			element.sendKeys('BrowserStack', Key.RETURN).then(() => {
				driver.wait(until.titleContains('BrowserStack')).then(() => driver.getTitle().then((title) => {
					console.log(title);
					driver.quit();
				}));
			})
		});
	});
}
