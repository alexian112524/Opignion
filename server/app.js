const dotenv = require('dotenv').config('./.env');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const Opignon = require('./models/opignon');
const Todo = require('./models/todo');

const app = express();
app.use(cors());

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    .then(() => console.log("Connexion MongoDB réussie !"))
    .catch(() => console.log("Echec de la connexion à MongoDB !"));

app.post('/api/opignons', (req, res, next) => {
    const opignon = new Opignon({
        ...req.body
    });
    opignon.save()
        .then(response => { res.status(201).json({ opignon: response})})
        .catch(error => { res.status(400).json({ error })});
});

app.get('/api/opignon/:id', (req, res, next) => {
    Opignon.findOne({ _id: req.params.id })
        .then(opignon => res.status(200).json(opignon))
        .catch(error => res.status(404).json({ error }));
});

app.get('/api/opignons', (req, res, next) => {
    Opignon.find()
        .then(opignons => res.status(200).json(opignons))
        .catch(error => res.status(400).json({ error }));
});

app.post('/api/todos', (req, res, next) => {
    const todo = new Todo({
        ...req.body
    });
    todo.save()
        .then(response => { res.status(201).json({todo: response}) })
        .catch(error => res.status(400).json({ error }));
});

app.get('/api/todos', (req, res, next) => {
    Todo.find()
        .then(todos => res.status(200).json(todos))
        .catch(error => res.status(400).json({ error }));
});

app.put('/api/todo/:id', (req, res, next) => {
    Todo.updateOne({_id: req.params.id}, {
        ...req.body, 
        _id: req.params.id
    })
    .then(() => res.status(200).json("Todo updated!"))
    .catch(error => res.status(400).json({ error }));
});

app.delete('/api/todo/:id', (req, res, next) => {
    Todo.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({ message: "Todo deleted!" }))
        .catch(error => res.status(400).json({ error }));
});

module.exports = app;