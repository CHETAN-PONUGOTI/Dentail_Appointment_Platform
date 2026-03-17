const db = require('../database');

const Dentist = {
    getAll: (callback) => {
        const query = `SELECT * FROM dentists`;
        db.all(query, [], (err, rows) => {
            callback(err, rows);
        });
    },
    getById: (id, callback) => {
        const query = `SELECT * FROM dentists WHERE id = ?`;
        db.get(query, [id], (err, row) => {
            callback(err, row);
        });
    }
};

module.exports = Dentist;