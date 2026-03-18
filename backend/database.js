const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'dentists.db'), (err) => {
    if (err) console.error('Database connection error:', err);
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS dentists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        qualification TEXT,
        experience INTEGER,
        clinic TEXT,
        address TEXT,
        location TEXT,
        photo TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patientName TEXT,
        age INTEGER,
        gender TEXT,
        appointmentDate TEXT,
        dentistId INTEGER,
        FOREIGN KEY(dentistId) REFERENCES dentists(id)
    )`);

    db.get("SELECT COUNT(*) as count FROM dentists", (err, row) => {
        if (row && row.count === 0) {
            const stmt = db.prepare("INSERT INTO dentists (name, qualification, experience, clinic, address, location, photo) VALUES (?, ?, ?, ?, ?, ?, ?)");
            stmt.run("Dr. Priya Sharma", "BDS, MDS", 10, "Smile Care", "123 Dental Lane", "Mumbai", "https://png.pngtree.com/png-clipart/20240701/original/pngtree-indian-doctor-woman-smiling-at-camera-png-image_15456626.png");
            stmt.run("Dr. John Doe", "BDS", 5, "City Dental", "456 Health St", "Brooklyn", "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200");
            stmt.finalize();
        }
    });
});

module.exports = db;