const express = require('express');
const router = express.Router();
const Dentist = require('../models/Dentist');

router.get('/', (req, res) => {
    Dentist.getAll((err, dentists) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(dentists);
    });
});

module.exports = router;