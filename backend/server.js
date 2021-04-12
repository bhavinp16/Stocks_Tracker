const express = require('express');
const app = express();

const cors = require('cors');

app.use(cors);

const PORT = process.env.PORT || 8000;
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var methodOverride = require('method-override');
const { User } = require('./models/user');
const register = require('./routes/register');
const auth = require('./routes/auth');


mongoose.connect('mongodb://localhost/hackathon')
    .then(() => console.log('connected to hackathon'))
    .catch(err => console.log('could not connect.'));

app.set('views', './frontend');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/assets', express.static('assets'));
app.use(methodOverride('_method'));
app.use('/register', register);
app.use('/login', auth);

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.get('/login', (req, res) => {
    res.render('login.ejs');
})

app.get('/register', (req, res) => {
    res.render('register.ejs');
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});