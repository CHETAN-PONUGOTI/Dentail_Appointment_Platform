const db = require('../database');

const Appointment = {
    create: (data, callback) => {
        const { patientName, age, gender, appointmentDate, dentistId } = data;
        const query = `INSERT INTO appointments (patientName, age, gender, appointmentDate, dentistId) 
                       VALUES (?, ?, ?, ?, ?)`;
        db.run(query, [patientName, age, gender, appointmentDate, dentistId], function(err) {
            callback(err, this.lastID);
        });
    },
    getAllWithDetails: (callback) => {
        const query = `
            SELECT a.*, d.name as dentistName, d.clinic as clinicName 
            FROM appointments a 
            JOIN dentists d ON a.dentistId = d.id
            ORDER BY a.appointmentDate DESC
        `;
        db.all(query, [], (err, rows) => {
            callback(err, rows);
        });
    },
    delete: (id, callback) => {
        const query = `DELETE FROM appointments WHERE id = ?`;
        db.run(query, [id], function(err) {
            callback(err, this.changes);
        });
    }
};

module.exports = Appointment;