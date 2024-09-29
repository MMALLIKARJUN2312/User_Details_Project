const db = require('../config/db');

const Address = {
    create: (user_id, address) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO Address (user_id, address) VALUES (?, ?)', [user_id, address], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.insertId);
            });
        });
    },
};

module.exports = Address;
