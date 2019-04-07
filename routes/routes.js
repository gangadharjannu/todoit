const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET = process.env.SECRET;
const router = express.Router();

const Todo = require('../models/todo');
const User = require('../models/user');

// get all todos
router.get('/todos', (req, res, next) => {
    Todo.find({ user: req.user.name })
        .then(todos => res.json(todos))
        .catch(next);
});

// add todo
router.post('/todo', (req, res) => {
    if (req.body.name) {
        Todo.create({ name: req.body.name, done: false, user: req.user.name })
            .then(todo => {
                if (todo) {
                    res.status(200).json(todo);
                } else {
                    res.status(400).json({
                        message: 'Unable to create todo list.'
                    });
                }
            })
            .catch(() => {
                res.status(400).json({
                    message: 'Unable to create todo list.'
                });
            });
    } else {
        res.status(400).json({ error: 'Invalid input' });
    }
});

// authentication
router.post('/register', (req, res, next) => {
    const { username, password } = req.body;
    try {
        bcrypt.hash(password, 10).then(hash => {
            User.create({ name: username, password: hash }).catch(error =>
                next(error)
            );
            res.status(200).json({ username });
        });
    } catch (error) {
        res.status(400).json({
            message: 'Invalid input'
        });
    }
});

router.post('/login', (req, res, next) => {
    User.findOne({ name: req.body.username })
        .then(user => {
            bcrypt
                .compare(req.body.password, user.password)
                .then(hasMatched => {
                    if (hasMatched) {
                        var token = jwt.sign({ userId: user.id }, SECRET, {
                            expiresIn: 60 * 60
                        });
                        Todo.find({ user: req.body.username })
                            .then(todos => {
                                res.json({ todos, username: user.name, token });
                            })
                            .catch(next);
                    } else {
                        res.status(400).json({
                            message: 'Invalid credentials'
                        });
                    }
                });
        })
        .catch(() => res.status(400).json({ message: 'Invalid credentials' }));
});
module.exports = router;
