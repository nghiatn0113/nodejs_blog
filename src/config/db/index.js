const mongoose = require('mongoose');


async function connect() {
    mongoose.set('strictQuery', true);
    try {
        await mongoose.connect('mongodb://localhost:27017/f8_education_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Successfully connected');
    } catch (error) {
        console.log('Failure connected');
    }
}

module.exports = { connect };