const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes/routes');
const User = require('./models/user');

const app = express();

const port = process.env.PORT || 5000;
const SECRET = process.env.SECRET;
const Database = process.env.DB_URL;

mongoose
    .connect(Database, { useNewUrlParser: true })
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error(err));

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     );

//     next();
// });
const CORSOptions = {
    origin: 'http://localhost:4200'
};

app.use(cors(CORSOptions));
app.options('*', cors(CORSOptions));

app.use(bodyParser.json());

app.use((req, res, next) => {
    if (['/api/V1/register', '/api/V1/login'].indexOf(req.url) === -1) {
        try {
            const token =
                req.headers.authorization &&
                req.headers.authorization.split(' ')[1];
            if (token) {
                jwt.verify(token, SECRET, (err, payload) => {
                    if (payload) {
                        User.findById(payload.userId).then(user => {
                            req.user = user;
                            next();
                        });
                    } else {
                        next();
                    }
                });
            } else {
                return res.status(401).json({
                    message: 'You don"t have authorization to view this route'
                });
            }
        } catch (e) {
            next();
        }
    } else {
        next();
    }
});
app.use('/api/V1', routes);
app.use((err, req, res, next) => {
    console.error(err);
    next();
});

// app.use((req, res, next) => {
//     res.send('Welcome to Express');
// });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
