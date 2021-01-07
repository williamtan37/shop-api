const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoutes = require('./api/routes/products');
const app = express();

mongoose.connect("mongodb+srv://node-shop:" + process.env.MONGO_ATLAS_PW + "@cluster0.nziup.mongodb.net/<dbname>?retryWrites=true&w=majority", { useNewUrlParser: true })

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Context-Type, Accept, Authorization');

    if(req.meothod === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods',
        'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/products', productRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
}) 
module.exports = app;