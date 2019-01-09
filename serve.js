require('./config/config');

var {mongoose} = require('./db/mongoose');

const express = require('express');
const hbs = require('hbs');

var {Task} = require('./models/tasks');

let serverApp = express();

serverApp.use(cors());
serverApp.options('*', cors());
const port = process.env.PORT;

serverApp.get('/', (req, res) => {
    res.render('home.hbs', {

    });
});
serverApp.listen(port, () => {
    console.log(`Your express app is being served on port ${port}!`);
});