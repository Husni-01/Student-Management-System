-- ========================================================
-- Student Result Management System (SRMS) Database Schema
-- Normalized MySQL Schema for Production Deployment
-- ========================================================

CREATE DATABASE IF NOT EXISTS srms_db;
USE srms_db;

-- Drop tables in reverse dependency order if resetting
DROP TABLE IF EXISTS feedback;
DROP TABLE IF EXISTS calendar_events;
DROP TABLE IF EXISTS attendance;
DROP TABLE IF EXISTS results;
DROP TABLE IF EXISTS student_courses;
DROP TABLE IF EXISTS notices;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS students;

-- 1. Students Table
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    roll_no VARCHAR(50) NOT NULL UNIQUE,
    program VARCHAR(100) NOT NULL DEFAULT 'B.Tech CSE',
    current_year VARCHAR(50) NOT NULL DEFAULT '3rd Year',
    semester VARCHAR(50) NOT NULL DEFAULT '5th Semester',
    cgpa DECIMAL(3,2) NOT NULL DEFAULT 8.45,
    overall_rank INT NOT NULL DEFAULT 12,
    total_students INT NOT NULL DEFAULT 120,
    overall_attendance DECIMAL(5,2) NOT NULL DEFAULT 87.00,
    avatar_url VARCHAR(255) DEFAULT 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    phone VARCHAR(20) DEFAULT '+91 98765 43210',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Courses Table
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_code VARCHAR(20) NOT NULL UNIQUE,
    course_name VARCHAR(150) NOT NULL,
    credits INT NOT NULL DEFAULT 4,
    instructor VARCHAR(100) NOT NULL,
    semester VARCHAR(50) NOT NULL DEFAULT '5th Semester',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Student-Course Enrollment Table
CREATE TABLE student_courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    enrollment_status ENUM('Enrolled', 'Completed', 'Dropped') DEFAULT 'Enrolled',
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_student_course (student_id, course_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Results Table
CREATE TABLE results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    exam_type VARCHAR(50) NOT NULL DEFAULT 'Mid Sem',
    grade VARCHAR(10) NOT NULL,
    score INT NOT NULL,
    max_score INT NOT NULL DEFAULT 100,
    exam_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Notices Table
CREATE TABLE notices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    publish_date DATE NOT NULL,
    category VARCHAR(50) DEFAULT 'Academic',
    is_urgent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Attendance Table
CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    classes_held INT NOT NULL DEFAULT 40,
    classes_attended INT NOT NULL DEFAULT 35,
    percentage DECIMAL(5,2) DEFAULT 87.50,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_student_attendance (student_id, course_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Academic Calendar Events
CREATE TABLE calendar_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    event_type VARCHAR(50) DEFAULT 'Exam',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Feedback Table
CREATE TABLE feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    subject VARCHAR(150) NOT NULL,
    category VARCHAR(50) DEFAULT 'General',
    message TEXT NOT NULL,
    rating INT DEFAULT 5,
    status ENUM('Pending', 'Reviewed', 'Resolved') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================================
-- Seed Initial Data (Matching Blueprint Exactly)
-- ========================================================

-- Insert Abhishek Verma
INSERT INTO students (id, name, email, roll_no, program, current_year, semester, cgpa, overall_rank, total_students, overall_attendance)
VALUES (1, 'Abhishek Verma', 'abhishek.verma@university.edu', '21BCSE104', 'B.Tech CSE', '3rd Year', '5th Semester', 8.45, 12, 120, 87.00);

-- Insert Courses
INSERT INTO courses (id, course_code, course_name, credits, instructor, semester) VALUES
(1, 'CS301', 'Data Structures', 4, 'Dr. Sarah Jenkins', '5th Semester'),
(2, 'CS302', 'Database Management Systems', 4, 'Prof. Robert Miller', '5th Semester'),
(3, 'CS303', 'Operating Systems', 4, 'Dr. Alan Vance', '5th Semester'),
(4, 'CS304', 'Computer Networks', 4, 'Prof. Emily Watson', '5th Semester'),
(5, 'CS305', 'Software Engineering', 4, 'Dr. Marcus Vance', '5th Semester'),
(6, 'CS306', 'Cloud Computing', 3, 'Prof. Neil Sharma', '5th Semester');

-- Enroll Student in 6 Courses
INSERT INTO student_courses (student_id, course_id, enrollment_status) VALUES
(1, 1, 'Enrolled'),
(1, 2, 'Enrolled'),
(1, 3, 'Enrolled'),
(1, 4, 'Enrolled'),
(1, 5, 'Enrolled'),
(1, 6, 'Enrolled');

-- Insert Results (5 Recent Results from Image)
INSERT INTO results (student_id, course_id, exam_type, grade, score, max_score, exam_date) VALUES
(1, 1, 'Mid Sem', 'A', 86, 100, '2024-05-12'),
(1, 2, 'Mid Sem', 'A+', 91, 100, '2024-05-10'),
(1, 3, 'Mid Sem', 'B+', 78, 100, '2024-05-08'),
(1, 4, 'Mid Sem', 'A', 85, 100, '2024-05-06'),
(1, 5, 'Mid Sem', 'A+', 92, 100, '2024-05-04');

-- Insert Notices (From Image)
INSERT INTO notices (title, description, publish_date, category) VALUES
('End Semester Exam Schedule', 'The end semester exams will begin from 25th May 2024.', '2024-05-15', 'Exam'),
('Result Declaration Notice', 'Results for Mid Semester Exams has been declared.', '2024-05-12', 'Academic'),
('Project Submission Deadline', 'Final year project submission is due on 30th May 2024.', '2024-05-10', 'Deadline');

-- Insert Attendance
INSERT INTO attendance (student_id, course_id, classes_held, classes_attended, percentage) VALUES
(1, 1, 40, 36, 90.00),
(1, 2, 42, 38, 90.47),
(1, 3, 38, 31, 81.57),
(1, 4, 39, 34, 87.18),
(1, 5, 40, 35, 87.50),
(1, 6, 35, 30, 85.71);

-- Insert Calendar Events
INSERT INTO calendar_events (title, event_date, event_type) VALUES
('Mid Sem Project Review', '2024-05-20', 'Submission'),
('End Semester Exam Begins', '2024-05-25', 'Exam'),
('Final Project Submission', '2024-05-30', 'Deadline');

