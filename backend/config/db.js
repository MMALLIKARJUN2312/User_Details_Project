const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Mallik@MYSQL365',
});

const createDatabase = () => {
    return new Promise((resolve, reject) => {
        pool.query('CREATE DATABASE IF NOT EXISTS user_details;', (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};

const createTables = () => {
    return new Promise((resolve, reject) => {
        pool.query('USE user_details;', (err) => {
            if (err) {
                return reject(err);
            }

            fs.readFile(path.join(__dirname, 'schema.sql'), 'utf8', (err, data) => {
                if (err) {
                    return reject(err);
                }

                const commands = data.split(';').map(cmd => cmd.trim()).filter(cmd => cmd);

                const executeCommand = (index) => {
                    if (index >= commands.length) {
                        return resolve();
                    }
                    pool.query(commands[index], (err) => {
                        if (err) {
                            return reject(err);
                        }
                        executeCommand(index + 1);
                    });
                };

                executeCommand(0);
            });
        });
    });
};

const initializeDatabase = async () => {
    try {
        await createDatabase();
        await createTables();
        console.log('Database and tables created successfully');
    } catch (error) {
        console.error('Error creating database and tables:', error.message);
    }
};

module.exports = {
    pool,
    initializeDatabase,
};
