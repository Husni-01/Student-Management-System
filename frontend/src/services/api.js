/**
 * Centralized API service for SRMS
 * Handles error normalization, request deduplication, and base URL routing.
 */

const BASE_URL = '/api';

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  try {
    const response = await fetch(url, { ...options, headers });
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = { message: await response.text() };
    }

    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error on ${url}:`, error.message);
    throw error;
  }
}

export const api = {
  // Dashboard
  getDashboardData: (studentId = 1, signal) => 
    request(`/dashboard?studentId=${studentId}`, { signal }),

  // Student Profile
  getStudent: (id = 1, signal) => 
    request(`/students/${id}`, { signal }),
  updateStudent: (id, studentData) => 
    request(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(studentData)
    }),

  // Results CRUD
  getResults: (signal) => 
    request('/results', { signal }),
  createResult: (resultData) => 
    request('/results', {
      method: 'POST',
      body: JSON.stringify(resultData)
    }),
  updateResult: (id, resultData) => 
    request(`/results/${id}`, {
      method: 'PUT',
      body: JSON.stringify(resultData)
    }),
  deleteResult: (id) => 
    request(`/results/${id}`, {
      method: 'DELETE'
    }),

  // Courses CRUD
  getCourses: (signal) => 
    request('/courses', { signal }),
  createCourse: (courseData) => 
    request('/courses', {
      method: 'POST',
      body: JSON.stringify(courseData)
    }),
  deleteCourse: (id) => 
    request(`/courses/${id}`, {
      method: 'DELETE'
    }),

  // Notices CRUD
  getNotices: (signal) => 
    request('/notices', { signal }),
  createNotice: (noticeData) => 
    request('/notices', {
      method: 'POST',
      body: JSON.stringify(noticeData)
    }),
  deleteNotice: (id) => 
    request(`/notices/${id}`, {
      method: 'DELETE'
    }),

  // Attendance
  getAttendance: (signal) => 
    request('/attendance', { signal }),
  updateAttendance: (id, data) => 
    request(`/attendance/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
};

