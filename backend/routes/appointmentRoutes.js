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

module.exports = router;