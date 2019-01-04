const express = require('express');
const hbs = require('hbs');
let serverApp = express();
const port = process.env.PORT || 3000;
serverApp.use(express.static(`${__dirname}/public`));
serverApp.get('/', (req, res) => {
    res.render('home.hbs', {

    });
});
serverApp.listen(port, () => {
    console.log(`Your express app is being served on port ${port}!`);
});