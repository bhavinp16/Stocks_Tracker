const express = require('express');
const connectDB = require('./config/db');

const app = express();

const cors = require('cors');
app.use(cors);


const register = require('./routes/register');
const auth = require('./routes/auth');

connectDB();

app.use('/register', register);
app.use('/login', auth);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
