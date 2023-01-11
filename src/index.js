const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const morgan = require('morgan');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public/')));

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine('hbs', handlebars.engine({
	extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.get('/', (req, res) => {
	res.render('home');
})

app.get('/news', (req, res) => {
	console.log(req.query.q);
	res.render('news');
})

app.get('/search', (req, res) => {
	res.render('search');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})