const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { initDB } = require('./config/db');

// Routes
const dashboardRoutes = require('./routes/dashboard');
const studentRoutes = require('./routes/students');
const courseRoutes = require('./routes/courses');
const resultRoutes = require('./routes/results');
const noticeRoutes = require('./routes/notices');
const attendanceRoutes = require('./routes/attendance');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    system: 'Student Result Management System (SRMS) API',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/attendance', attendanceRoutes);

// 404 Not Found Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route ${req.originalUrl} not found.`
  });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('[Unhandled Error]:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Boot Server
app.listen(PORT, async () => {
  console.log(`====================================================`);
  console.log(`🚀 SRMS Server running on http://localhost:${PORT}`);
  console.log(`⚡ API Endpoints active at http://localhost:${PORT}/api/`);
  console.log(`====================================================`);
  await initDB();
});

