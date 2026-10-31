const db = require('../config/db');

exports.getAttendance = async (req, res) => {
  try {
    const records = await db.query('SELECT * FROM attendance');
    res.json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateAttendance = async (req, res) => {
  try {
    const { classes_held, classes_attended } = req.body;
    const { id } = req.params;

    if (classes_held === undefined || classes_attended === undefined) {
      return res.status(400).json({ success: false, message: 'Held and Attended class counts are required' });
    }

    await db.query(
      'UPDATE attendance SET classes_held = ?, classes_attended = ? WHERE id = ?',
      [Number(classes_held), Number(classes_attended), id]
    );

    res.json({
      success: true,
      message: 'Attendance updated successfully',
      data: { id, classes_held, classes_attended }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

