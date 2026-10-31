const db = require('../config/db');

exports.getCourses = async (req, res) => {
  try {
    const courses = await db.query('SELECT * FROM courses ORDER BY id ASC');
    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const { course_code, course_name, credits, instructor, semester } = req.body;
    if (!course_code || !course_name) {
      return res.status(400).json({ success: false, message: 'Course Code and Course Name are required.' });
    }

    const result = await db.query(
      'INSERT INTO courses (course_code, course_name, credits, instructor, semester) VALUES (?, ?, ?, ?, ?)',
      [course_code, course_name, credits || 4, instructor || 'Faculty', semester || '5th Semester']
    );

    res.status(201).json({
      success: true,
      message: 'Course added successfully',
      data: { id: result.insertId, course_code, course_name, credits: credits || 4, instructor, semester }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await db.query('DELETE FROM courses WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

