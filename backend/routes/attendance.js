const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.get('/', attendanceController.getAttendance);
router.put('/:id', attendanceController.updateAttendance);

module.exports = router;

