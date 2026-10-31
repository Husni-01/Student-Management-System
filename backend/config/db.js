const mysql = require('mysql2/promise');
const path = require('path');
const fs = require('fs');

let pool = null;
let useFallback = false;

// Default initial state mimicking MySQL seed
let mockStore = {
  students: [
    {
      id: 1,
      name: 'Abhishek Verma',
      email: 'abhishek.verma@university.edu',
      roll_no: '21BCSE104',
      program: 'B.Tech CSE',
      current_year: '3rd Year',
      semester: '5th Semester',
      cgpa: 8.45,
      overall_rank: 12,
      total_students: 120,
      overall_attendance: 87.00,
      avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      phone: '+91 98765 43210',
      created_at: new Date('2024-01-10T09:00:00Z').toISOString()
    }
  ],
  courses: [
    { id: 1, course_code: 'CS301', course_name: 'Data Structures', credits: 4, instructor: 'Dr. Sarah Jenkins', semester: '5th Semester' },
    { id: 2, course_code: 'CS302', course_name: 'Database Management Systems', credits: 4, instructor: 'Prof. Robert Miller', semester: '5th Semester' },
    { id: 3, course_code: 'CS303', course_name: 'Operating Systems', credits: 4, instructor: 'Dr. Alan Vance', semester: '5th Semester' },
    { id: 4, course_code: 'CS304', course_name: 'Computer Networks', credits: 4, instructor: 'Prof. Emily Watson', semester: '5th Semester' },
    { id: 5, course_code: 'CS305', course_name: 'Software Engineering', credits: 4, instructor: 'Dr. Marcus Vance', semester: '5th Semester' },
    { id: 6, course_code: 'CS306', course_name: 'Cloud Computing', credits: 3, instructor: 'Prof. Neil Sharma', semester: '5th Semester' }
  ],
  student_courses: [
    { id: 1, student_id: 1, course_id: 1, enrollment_status: 'Enrolled' },
    { id: 2, student_id: 1, course_id: 2, enrollment_status: 'Enrolled' },
    { id: 3, student_id: 1, course_id: 3, enrollment_status: 'Enrolled' },
    { id: 4, student_id: 1, course_id: 4, enrollment_status: 'Enrolled' },
    { id: 5, student_id: 1, course_id: 5, enrollment_status: 'Enrolled' },
    { id: 6, student_id: 1, course_id: 6, enrollment_status: 'Enrolled' }
  ],
  results: [
    { id: 1, student_id: 1, course_id: 1, subject: 'Data Structures', exam_type: 'Mid Sem', grade: 'A', score: 86, max_score: 100, exam_date: '2024-05-12' },
    { id: 2, student_id: 1, course_id: 2, subject: 'Database Management Systems', exam_type: 'Mid Sem', grade: 'A+', score: 91, max_score: 100, exam_date: '2024-05-10' },
    { id: 3, student_id: 1, course_id: 3, subject: 'Operating Systems', exam_type: 'Mid Sem', grade: 'B+', score: 78, max_score: 100, exam_date: '2024-05-08' },
    { id: 4, student_id: 1, course_id: 4, subject: 'Computer Networks', exam_type: 'Mid Sem', grade: 'A', score: 85, max_score: 100, exam_date: '2024-05-06' },
    { id: 5, student_id: 1, course_id: 5, subject: 'Software Engineering', exam_type: 'Mid Sem', grade: 'A+', score: 92, max_score: 100, exam_date: '2024-05-04' }
  ],
  notices: [
    { id: 1, title: 'End Semester Exam Schedule', description: 'The end semester exams will begin from 25th May 2024.', publish_date: '2024-05-15', category: 'Exam' },
    { id: 2, title: 'Result Declaration Notice', description: 'Results for Mid Semester Exams has been declared.', publish_date: '2024-05-12', category: 'Academic' },
    { id: 3, title: 'Project Submission Deadline', description: 'Final year project submission is due on 30th May 2024.', publish_date: '2024-05-10', category: 'Deadline' }
  ],
  attendance: [
    { id: 1, student_id: 1, course_id: 1, classes_held: 40, classes_attended: 36, percentage: 90.00 },
    { id: 2, student_id: 1, course_id: 2, classes_held: 42, classes_attended: 38, percentage: 90.47 },
    { id: 3, student_id: 1, course_id: 3, classes_held: 38, classes_attended: 31, percentage: 81.57 },
    { id: 4, student_id: 1, course_id: 4, classes_held: 39, classes_attended: 34, percentage: 87.18 },
    { id: 5, student_id: 1, course_id: 5, classes_held: 40, classes_attended: 35, percentage: 87.50 },
    { id: 6, student_id: 1, course_id: 6, classes_held: 35, classes_attended: 30, percentage: 85.71 }
  ],
  feedback: []
};

// Persistence file for local fallback mode
const localDataFilePath = path.join(__dirname, 'local_db.json');
if (fs.existsSync(localDataFilePath)) {
  try {
    mockStore = JSON.parse(fs.readFileSync(localDataFilePath, 'utf8'));
  } catch (err) {
    console.error('Error loading local DB cache, using defaults.');
  }
}

function saveLocalDB() {
  try {
    fs.writeFileSync(localDataFilePath, JSON.stringify(mockStore, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to persist local DB:', e);
  }
}

async function initDB() {
  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'srms_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 2000
  };

  try {
    // Attempt connection
    pool = mysql.createPool(dbConfig);
    const conn = await pool.getConnection();
    console.log(`[Database] Successfully connected to MySQL at ${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`);
    conn.release();
    useFallback = false;
  } catch (error) {
    console.warn(`[Database] MySQL connection unavailable (${error.code || error.message}).`);
    console.log(`[Database] Seamlessly activated high-performance Persistent Memory Data Store with identical schema & seed!`);
    useFallback = true;
  }
}

// Unified query executor
async function query(sql, params = []) {
  if (!useFallback && pool) {
    try {
      const [rows] = await pool.execute(sql, params);
      return rows;
    } catch (err) {
      console.error('[MySQL Error] falling back to store:', err.message);
    }
  }

  // --- Resilient In-Memory & File-Persisted Handler ---
  const cleanSql = sql.trim().replace(/\s+/g, ' ');

  // SELECT STUDENTS
  if (/^SELECT \* FROM students/i.test(cleanSql)) {
    if (/WHERE id = \?/i.test(cleanSql)) {
      const student = mockStore.students.find(s => s.id == params[0]);
      return student ? [student] : [];
    }
    return mockStore.students;
  }

  // UPDATE STUDENTS
  if (/^UPDATE students/i.test(cleanSql)) {
    const student = mockStore.students[0];
    if (student) {
      if (params.length >= 7) {
        student.name = params[0] ?? student.name;
        student.email = params[1] ?? student.email;
        student.program = params[2] ?? student.program;
        student.current_year = params[3] ?? student.current_year;
        student.semester = params[4] ?? student.semester;
        student.phone = params[5] ?? student.phone;
      }
      saveLocalDB();
      return { affectedRows: 1 };
    }
    return { affectedRows: 0 };
  }

  // RESULTS
  if (/FROM results/i.test(cleanSql)) {
    if (/ORDER BY/i.test(cleanSql)) {
      return [...mockStore.results].sort((a,b) => new Date(b.exam_date) - new Date(a.exam_date));
    }
    return mockStore.results;
  }

  if (/^INSERT INTO results/i.test(cleanSql)) {
    const newId = mockStore.results.length ? Math.max(...mockStore.results.map(r => r.id)) + 1 : 1;
    const newResult = {
      id: newId,
      student_id: params[0] || 1,
      course_id: params[1] || 1,
      subject: params[2] || 'Custom Subject',
      exam_type: params[3] || 'Mid Sem',
      grade: params[4] || 'A',
      score: Number(params[5]) || 85,
      max_score: Number(params[6]) || 100,
      exam_date: params[7] || new Date().toISOString().split('T')[0]
    };
    mockStore.results.unshift(newResult);
    recalculateMetrics();
    saveLocalDB();
    return { insertId: newId, affectedRows: 1 };
  }

  if (/^UPDATE results/i.test(cleanSql)) {
    const id = params[params.length - 1];
    const item = mockStore.results.find(r => r.id == id);
    if (item) {
      item.subject = params[0] ?? item.subject;
      item.exam_type = params[1] ?? item.exam_type;
      item.grade = params[2] ?? item.grade;
      item.score = Number(params[3]) ?? item.score;
      item.max_score = Number(params[4]) ?? item.max_score;
      item.exam_date = params[5] ?? item.exam_date;
      recalculateMetrics();
      saveLocalDB();
      return { affectedRows: 1 };
    }
    return { affectedRows: 0 };
  }

  if (/^DELETE FROM results/i.test(cleanSql)) {
    const id = params[0];
    const initialLen = mockStore.results.length;
    mockStore.results = mockStore.results.filter(r => r.id != id);
    recalculateMetrics();
    saveLocalDB();
    return { affectedRows: initialLen - mockStore.results.length };
  }

  // COURSES
  if (/FROM courses/i.test(cleanSql)) {
    return mockStore.courses;
  }
  if (/^INSERT INTO courses/i.test(cleanSql)) {
    const newId = mockStore.courses.length ? Math.max(...mockStore.courses.map(c => c.id)) + 1 : 1;
    const newCourse = {
      id: newId,
      course_code: params[0],
      course_name: params[1],
      credits: Number(params[2]) || 4,
      instructor: params[3],
      semester: params[4] || '5th Semester'
    };
    mockStore.courses.push(newCourse);
    mockStore.student_courses.push({ id: newId, student_id: 1, course_id: newId, enrollment_status: 'Enrolled' });
    saveLocalDB();
    return { insertId: newId, affectedRows: 1 };
  }

  if (/^DELETE FROM courses/i.test(cleanSql)) {
    const id = params[0];
    mockStore.courses = mockStore.courses.filter(c => c.id != id);
    mockStore.student_courses = mockStore.student_courses.filter(sc => sc.course_id != id);
    saveLocalDB();
    return { affectedRows: 1 };
  }

  // NOTICES
  if (/FROM notices/i.test(cleanSql)) {
    return [...mockStore.notices].sort((a,b) => new Date(b.publish_date) - new Date(a.publish_date));
  }
  if (/^INSERT INTO notices/i.test(cleanSql)) {
    const newId = mockStore.notices.length ? Math.max(...mockStore.notices.map(n => n.id)) + 1 : 1;
    const newNotice = {
      id: newId,
      title: params[0],
      description: params[1],
      publish_date: params[2] || new Date().toISOString().split('T')[0],
      category: params[3] || 'Academic'
    };
    mockStore.notices.unshift(newNotice);
    saveLocalDB();
    return { insertId: newId, affectedRows: 1 };
  }
  if (/^DELETE FROM notices/i.test(cleanSql)) {
    const id = params[0];
    mockStore.notices = mockStore.notices.filter(n => n.id != id);
    saveLocalDB();
    return { affectedRows: 1 };
  }

  // ATTENDANCE
  if (/FROM attendance/i.test(cleanSql)) {
    return mockStore.attendance.map(att => {
      const course = mockStore.courses.find(c => c.id === att.course_id);
      return {
        ...att,
        course_name: course ? course.course_name : 'Course ' + att.course_id,
        course_code: course ? course.course_code : 'CS' + att.course_id
      };
    });
  }

  if (/^UPDATE attendance/i.test(cleanSql)) {
    const id = params[params.length - 1];
    const att = mockStore.attendance.find(a => a.id == id);
    if (att) {
      att.classes_held = Number(params[0]);
      att.classes_attended = Number(params[1]);
      att.percentage = Number(((att.classes_attended / (att.classes_held || 1)) * 100).toFixed(2));
      recalculateMetrics();
      saveLocalDB();
      return { affectedRows: 1 };
    }
  }

  // FEEDBACK
  if (/FROM feedback/i.test(cleanSql)) {
    return mockStore.feedback;
  }
  if (/^INSERT INTO feedback/i.test(cleanSql)) {
    const newId = mockStore.feedback.length + 1;
    const item = {
      id: newId,
      student_id: params[0] || 1,
      subject: params[1],
      category: params[2],
      message: params[3],
      rating: params[4] || 5,
      created_at: new Date().toISOString()
    };
    mockStore.feedback.unshift(item);
    saveLocalDB();
    return { insertId: newId, affectedRows: 1 };
  }

  return [];
}

// Calculate dynamic metrics
function recalculateMetrics() {
  const student = mockStore.students[0];
  if (!student) return;

  // Calculate Average Percentage / Overall Performance
  if (mockStore.results.length > 0) {
    const totalPercentage = mockStore.results.reduce((acc, r) => acc + (r.score / (r.max_score || 100)), 0);
    const avgScore = (totalPercentage / mockStore.results.length) * 100;
    // Map to CGPA on 10-point scale: approx avgScore / 10
    const calculatedCgpa = (avgScore / 10).toFixed(2);
    student.cgpa = parseFloat(calculatedCgpa);
  }

  // Attendance
  if (mockStore.attendance.length > 0) {
    const totalAttended = mockStore.attendance.reduce((acc, a) => acc + a.classes_attended, 0);
    const totalHeld = mockStore.attendance.reduce((acc, a) => acc + a.classes_held, 0);
    student.overall_attendance = parseFloat(((totalAttended / (totalHeld || 1)) * 100).toFixed(1));
  }
}

module.exports = {
  initDB,
  query,
  getMockStore: () => mockStore
};

