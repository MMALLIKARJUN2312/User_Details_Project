const { pool } = require('../config/db');

exports.registerUser = (req, res) => {
    const { name, address } = req.body;

    pool.query('INSERT INTO user (name) VALUES (?)', [name], (error, results) => {
        if (error) {
            console.error('Error inserting user:', error.message);
            return res.status(500).json({ message: 'Error registering user' });
        }

        const userId = results.insertId;

        pool.query('INSERT INTO address (userId, address) VALUES (?, ?)', [userId, address], (error) => {
            if (error) {
                console.error('Error inserting address:', error.message);
                return res.status(500).json({ message: 'Error registering user.' });
            }

            return res.status(200).json({ message: 'User registered successfully' });
        });
    });
};
