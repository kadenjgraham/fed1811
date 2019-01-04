const express = require('express');
const hbs = require('hbs');
let serverApp = express();
serverApp.use(express.static(`${__dirname}/public`));
serverApp.get('/', (req, res) => {
    res.render('home.hbs', {

    });
});
serverApp.listen(3000, () => {
    console.log('Your express app is being served on port 3000!');
});