const db = require('../config/db');

exports.getNotices = async (req, res) => {
  try {
    const notices = await db.query('SELECT * FROM notices ORDER BY publish_date DESC');
    const formatted = (notices || []).map(n => ({
      ...n,
      formattedDate: new Date(n.publish_date).toLocaleDateString('en-GB', {
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

exports.createNotice = async (req, res) => {
  try {
    const { title, description, publish_date, category } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and Description are required.' });
    }

    const date = publish_date || new Date().toISOString().split('T')[0];
    const result = await db.query(
      'INSERT INTO notices (title, description, publish_date, category) VALUES (?, ?, ?, ?)',
      [title, description, date, category || 'Academic']
    );

    res.status(201).json({
      success: true,
      message: 'Notice posted successfully',
      data: { id: result.insertId, title, description, publish_date: date, category: category || 'Academic' }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteNotice = async (req, res) => {
  try {
    await db.query('DELETE FROM notices WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Notice deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

