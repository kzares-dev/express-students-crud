const Student = require('../models/student.model'); // Import the Student model

// Create a new student
const createStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body.student); // Create a new Student object
    const savedStudent = await newStudent.save();
    res.status(201).json({ message: 'Student created', student: savedStudent });
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Error creating student' });
  }
};

const getStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const searchQuery = req.query.search || '';

    // Build the search filter
    const searchFilter = {};
    if (searchQuery) {
      searchFilter.$or = [
        { firstName: { $regex: searchQuery, $options: 'i' } },
        { lastName: { $regex: searchQuery, $options: 'i' } },
        { email: { $regex: searchQuery, $options: 'i' } },
      ];
    }

    const total = await Student.countDocuments(searchFilter);

    // Sort by creation date (assuming you have a createdAt field)
    const students = await Student.find(searchFilter)
      .sort({ createdAt: -1 }) // Sort in descending order (newest first)
      .skip(startIndex)
      .limit(limit);

    const nextPage = endIndex < total ? page + 1 : null;
    const previousPage = startIndex > 0 ? page - 1 : null;

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
  updateStudent,
  deleteStudent,
};