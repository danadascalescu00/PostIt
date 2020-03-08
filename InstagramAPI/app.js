const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

const port = process.env.PORT || 8080
const app = express()
const router = express.Router()

app.set('view engine', 'ejs')

app.use('/static', express.static(path.join(__dirname, 'views')))
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(bodyParser.json());

app.use(session({
  	resave: true,
  	secret: 'keyboard cat',
	saveUninitialized: false,
	cookie: { maxAge: 60000 }
}))

router.get('/', (req, res) => {

	console.log("main ", req.session)
	res.render('renders/landing', {
		
	})
})

router.post('/', (req, res) => {

	let canLogIn = false
	let name = undefined
	for (user of users)
		if (user.email == req.body.email && 
			user.pass == req.body.pass) 
		{ canLogIn = true, name = user.name }

	if (canLogIn) {
		res.send("ok " + name)
		req.session.login = true
		req.session.name = name
	} else {
		res.send("user not found")
		req.session.login = false
	}
	console.log("post ", req.session)
	current_session = req.session
})

router.post('/logout', (req, res) => {
	current_session.login = false
	req.session.destroy(function(err) {
	  res.send("ok")
	})
})

router.use(function(req, res, next){
	res.status(404);
	res.render('404_not_found')
});

app.use('/', router)
app.listen(port, () => console.log(`App listening on port ${port}!`))


