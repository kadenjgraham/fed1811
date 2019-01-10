require('./config/config');

var {mongoose} = require('./db/mongoose');

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const hbs = require('hbs');

const {ObjectID} = require('mongodb');

var {Task} = require('./models/tasks');

let serverApp = express();
serverApp.use(bodyParser.json());
serverApp.use(cors());
serverApp.options('*', cors());
const port = process.env.PORT;

serverApp.get('/tasks', (req, res) => {
    Task.find().then((allTasks) => {
        res.send(allTasks);
    }, (e) => {
        res.status(400), send(e);
    })
});

serverApp.post('/tasks', (req, res) => {
    let task = new Task({
        taskName: req.body.taskName
    });

    task.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

serverApp.delete('/tasks/:id', (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Task.findByIdAndRemove(id).then((task) => {
        if (!task) {
            return res.status(404).send();
        }
        res.send({
            task
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

serverApp.patch('/tasks/:id', (req, res) => {
    let id = req.params.id;
    // console.log(req.body);
    let body = {
        completed: req.body.completed
    }

    if(!_.isBoolean(body.completed) && body.completedAt){
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Task.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((task) => {
        res.send({
            task
        });
    }).catch((e) => {
        res.status(404).send();
    });
});

serverApp.listen(port, () => {
    console.log(`Your express app is being served on port ${port}!`);
});

module.exports = {
    serverApp
}