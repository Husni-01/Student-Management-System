const db = require('../config/db');

// Helper to determine Grade from score percentage
function calculateGrade(score, maxScore = 100) {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C';
  return 'F';
}

exports.getResults = async (req, res) => {
  try {
    const results = await db.query(
      `SELECT r.id, COALESCE(r.subject, c.course_name, 'Subject') AS subject, 
              r.exam_type, r.grade, r.score, r.max_score, r.exam_date
       FROM results r
       LEFT JOIN courses c ON r.course_id = c.id
       ORDER BY r.exam_date DESC`
    );

    const formatted = results.map(r => ({
      ...r,
      formattedDate: new Date(r.exam_date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    }));

    res.json({ success: true, data: formatted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createResult = async (req, res) => {
  try {
    const { student_id = 1, course_id = 1, subject, exam_type, score, max_score = 100, exam_date, grade } = req.body;

    if (!subject || score === undefined || score === null) {
      return res.status(400).json({ success: false, message: 'Subject and Score are required.' });
    }

    const calculatedGrade = grade || calculateGrade(Number(score), Number(max_score));
    const finalDate = exam_date || new Date().toISOString().split('T')[0];

    const result = await db.query(
      `INSERT INTO results (student_id, course_id, subject, exam_type, grade, score, max_score, exam_date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [student_id, course_id, subject, exam_type || 'Mid Sem', calculatedGrade, Number(score), Number(max_score), finalDate]
    );

    res.status(201).json({
      success: true,
      message: 'Result added successfully',
      data: {
        id: result.insertId,
        subject,
        exam_type: exam_type || 'Mid Sem',
        grade: calculatedGrade,
        score: Number(score),
        max_score: Number(max_score),
        exam_date: finalDate
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateResult = async (req, res) => {
  try {
    const { subject, exam_type, score, max_score = 100, exam_date, grade } = req.body;
    const { id } = req.params;

    if (!subject || score === undefined) {
      return res.status(400).json({ success: false, message: 'Subject and Score are required.' });
    }

    const calculatedGrade = grade || calculateGrade(Number(score), Number(max_score));
    const finalDate = exam_date || new Date().toISOString().split('T')[0];

    await db.query(
      `UPDATE results
       SET subject = ?, exam_type = ?, grade = ?, score = ?, max_score = ?, exam_date = ?
       WHERE id = ?`,
      [subject, exam_type, calculatedGrade, Number(score), Number(max_score), finalDate, id]
    );

    res.json({
      success: true,
      message: 'Result updated successfully',
      data: { id, subject, exam_type, grade: calculatedGrade, score: Number(score), max_score: Number(max_score), exam_date: finalDate }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteResult = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM results WHERE id = ?', [id]);
    res.json({ success: true, message: 'Result record deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

