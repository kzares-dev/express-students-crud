const Student = require('../models/student.model'); // Import the Student model

// Create a new student
const createStudent = async (req, res) => {
  try {
    console.log(req.body)
    const newStudent = new Student(req.body.student); // Create a new Student object
    const savedStudent = await newStudent.save();
    res.status(201).json({ message: 'Student created', student: savedStudent });
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Error creating student' });
  }
};

// Get all students with pagination
const getStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the page number from the query string
    const limit = parseInt(req.query.limit) || 10; // Get the limit from the query string
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const total = await Student.countDocuments(); // Count total documents

    const students = await Student.find();
    const nextPage = endIndex < total ? page + 1 : null; // Calculate the next page
    const previousPage = startIndex > 0 ? page - 1 : null; // Calculate the previous page

    console.log(students)

    res.json({
      students,
      nextPage,
      previousPage,
      total,
      currentPage: page,
      pageSize: limit,
    });

  } catch (error) {
    console.error('Error getting students:', error);
    res.status(500).json({ error: 'Error getting students' });
  }
};

// Get a student by ID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    console.error('Error getting student by ID:', error);
    res.status(500).json({ error: 'Error getting student by ID' });
  }
};

// Update a student by ID
const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body.student, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student updated', student: updatedStudent });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Error updating student' });
  }
};

// Delete a student by ID
const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Error deleting student' });
  }
};

// Export the functions
module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};