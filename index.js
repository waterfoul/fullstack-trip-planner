'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const models = require('./models');

const app = express();

//Setup
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

nunjucks.configure('views', {
	express: app
});

app.engine('html', nunjucks.render);

app.set('view engine', 'html');

// app.use(web_path, middleware) app.get+app.post+app.delete+app.put
// exppress.static(local_path)
app.use('/static', express.static(path.join(__dirname, 'static')));

app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));

//Routes
app.use(require('./routes'));

// catch 404 (i.e., no route was hit) and forward to error handler
app.use(function(req, res, next) {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// handle all errors (anything passed into `next()`)
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	console.error(err);
	res.render('errorPage');
});


models.sync(false).then(() => {
	app.listen('8042', function () {
		console.log('Listening on http://localhost:8042');
	});
}).catch(console.error.bind(console));