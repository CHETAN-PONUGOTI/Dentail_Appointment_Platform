const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

router.post('/', (req, res) => {
    const { patientName, age, gender, appointmentDate, dentistId } = req.body;
    
    if (!patientName || !appointmentDate || !dentistId) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    Appointment.create(req.body, (err, id) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id, message: "Appointment booked successfully" });
    });
});

router.get('/', (req, res) => {
    Appointment.getAllWithDetails((err, appointments) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(appointments);
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    Appointment.delete(id, (err, changes) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (changes === 0) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        
        res.json({ message: "Appointment deleted successfully" });
    });
});

module.exports = router;