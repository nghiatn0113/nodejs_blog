const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const route = require('./routes');
const db = require('./config/db/index');

// Connect to DB
db.connect();

const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, 'public/')));

app.use(express.urlencoded({
	extended: true
}));

app.use(express.json());

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine('hbs', handlebars.engine({
	extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () => {
	console.log(`App listening on port ${port}`)
});