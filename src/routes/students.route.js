const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students.controllers'); // Import the controller

// Create a new student
router.post('/', studentsController.createStudent);

// Get all students with pagination
router.get('/', studentsController.getStudents);

// Update a student by ID
router.put('/:id', studentsController.updateStudent);

// Delete a student by ID
router.delete('/:id', studentsController.deleteStudent);

module.exports = router;