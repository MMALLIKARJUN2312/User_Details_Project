const db = require('../config/db');

const User = {
    create: (name) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO User (name) VALUES (?)', [name], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.insertId);
            });
        });
    },
};

module.exports = User;
