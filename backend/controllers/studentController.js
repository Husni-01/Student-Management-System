const db = require('../config/db');

exports.getStudents = async (req, res) => {
  try {
    const students = await db.query('SELECT * FROM students');
    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await db.query('SELECT * FROM students WHERE id = ?', [req.params.id]);
    if (!student || student.length === 0) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.json({ success: true, data: student[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { name, email, program, current_year, semester, phone } = req.body;
    
    // Validation
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and Email are required.' });
    }

    await db.query(
      `UPDATE students 
       SET name = ?, email = ?, program = ?, current_year = ?, semester = ?, phone = ? 
       WHERE id = ?`,
      [name, email, program, current_year, semester, phone, req.params.id]
    );

    res.json({
      success: true,
      message: 'Student profile updated successfully',
      data: { id: req.params.id, name, email, program, current_year, semester, phone }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

