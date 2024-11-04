const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const cors = require('cors');
app.use(cors());
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.DBURL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

app.get('/api', (req, res) => res.json({message: 'Palikka nro 5'}));
app.use('/api/users', require('./entities/users/userRoutes'));
app.use('/api/sets', require('./entities/sets/setRoutes'));
app.use('/api/parts', require('./entities/parts/partRoutes'));
app.use('/api/colls', require('./entities/colls/collRoutes'));

app.listen(process.env.PORT, () => console.log('Server ready'));