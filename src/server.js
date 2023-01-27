const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const route = require('./routes');
const db = require('./config/db/index');
const dateFormat = require('handlebars-dateformat');
const methodOverride = require('method-override');

// Connect to DB
db.connect();

const app = express();
const port = 3000;

// Mount static files
app.use(express.static(path.join(__dirname, 'public/')));

// Override method HTTP protocol
app.use(methodOverride('_method'));

// Parse body payload
app.use(express.urlencoded({
	extended: true,
}));

// Using json for express
app.use(express.json());

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine('hbs', handlebars.engine({
	extname: '.hbs',
	helpers: {
		sum: (a, b) => a + b,
		dateFormat: dateFormat,
	}
}));

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () => {
	console.log(`App listening on port ${port}`)
});