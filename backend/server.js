const express = require('express');
const connectDB = require('./config/db');

const app = express();

const cors = require('cors');
app.use(cors());

// connect the database
connectDB();

//init  middleware
app.use(express.json({ extended: false }));

//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/stocks', require('./routes/stocks'));
app.use('/api/search', require('./routes/search'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
