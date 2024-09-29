const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const { initializeDatabase } = require('./config/db');
const cors = require('cors');

const app = express();

app.use(cors())
initializeDatabase();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', userRoutes);
app.use(express.static(path.join(__dirname, '../frontend')));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
