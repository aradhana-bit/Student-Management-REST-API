const express = require('express');
const students = require('../data/students');

const router = express.Router();

function getStudentId(id) {
  const studentId = Number(id);
  return Number.isInteger(studentId) && studentId > 0 ? studentId : null;
}

function hasValidStudentFields(student) {
  return student
    && typeof student.name === 'string'
    && student.name.trim() !== ''
    && Number.isInteger(student.age)
    && student.age > 0
    && typeof student.course === 'string'
    && student.course.trim() !== ''
    && typeof student.email === 'string'
    && student.email.trim() !== '';
}

function hasValidUpdateFields(body) {
  const allowedFields = ['name', 'age', 'course', 'email'];
  const fields = Object.keys(body || {});

  if (fields.length === 0 || fields.some((field) => !allowedFields.includes(field))) {
    return false;
  }

  if ('name' in body && (typeof body.name !== 'string' || body.name.trim() === '')) return false;
  if ('age' in body && (!Number.isInteger(body.age) || body.age <= 0)) return false;
  if ('course' in body && (typeof body.course !== 'string' || body.course.trim() === '')) return false;
  if ('email' in body && (typeof body.email !== 'string' || body.email.trim() === '')) return false;

  return true;
}

router.get('/', (req, res) => {
  res.status(200).json(students);
});

router.get('/:id', (req, res) => {
  const studentId = getStudentId(req.params.id);
  const student = students.find((item) => item.id === studentId);

  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }

  res.status(200).json(student);
});

router.post('/', (req, res) => {
  if (!hasValidStudentFields(req.body)) {
    return res.status(400).json({ error: 'Name, age, course and email are required' });
  }

  const nextId = students.length > 0
    ? Math.max(...students.map((student) => student.id)) + 1
    : 1;

  const newStudent = {
    id: nextId,
    name: req.body.name.trim(),
    age: req.body.age,
    course: req.body.course.trim(),
    email: req.body.email.trim()
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

router.put('/:id', (req, res) => {
  const studentId = getStudentId(req.params.id);
  const studentIndex = students.findIndex((item) => item.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ error: 'Student not found' });
  }

  if (!hasValidUpdateFields(req.body)) {
    return res.status(400).json({ error: 'Provide at least one valid field to update' });
  }

  const updates = { ...req.body };
  if (typeof updates.name === 'string') updates.name = updates.name.trim();
  if (typeof updates.course === 'string') updates.course = updates.course.trim();
  if (typeof updates.email === 'string') updates.email = updates.email.trim();

  students[studentIndex] = { ...students[studentIndex], ...updates };
  res.status(200).json(students[studentIndex]);
});

router.delete('/:id', (req, res) => {
  const studentId = getStudentId(req.params.id);
  const studentIndex = students.findIndex((item) => item.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ error: 'Student not found' });
  }

  students.splice(studentIndex, 1);
  res.status(200).json({ message: 'Student deleted successfully' });
});

module.exports = router;
