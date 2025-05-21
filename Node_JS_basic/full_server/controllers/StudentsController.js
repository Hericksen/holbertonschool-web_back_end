// full_server/controllers/StudentsController.js
const { readDatabase } = require('../utils'); // assuming the readDatabase function is located in the utils file

class StudentsController {
  // Method to get all students and display them by field
  static async getAllStudents(req, res) {
    try {
      const students = await readDatabase();  // Call the readDatabase function to fetch data

      // Check if the students data exists
      if (!students || students.length === 0) {
        return res.status(500).send('Cannot load the database');
      }

      // Group students by field (case insensitive)
      const fields = {};
      students.forEach(student => {
        const field = student.field.toLowerCase();  // Ensure case insensitivity
        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(student.firstname);
      });

      // Prepare the response message
      let message = 'This is the list of our students\n';
      for (const field in fields) {
        const studentList = fields[field].join(', ');
        message += `Number of students in ${field.toUpperCase()}: ${fields[field].length}. List: ${studentList}\n`;
      }

      // Send response with status 200
      res.status(200).send(message);
    } catch (error) {
      // If something goes wrong (database not available)
      res.status(500).send('Cannot load the database');
    }
  }

  // Method to get all students by major (either CS or SWE)
  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;  // Get the major parameter from the URL

    // Check if the major is valid (CS or SWE)
    if (!['CS', 'SWE'].includes(major)) {
      return res.status(500).send('Major parameter must be CS or SWE');
    }

    try {
      const students = await readDatabase();  // Call the readDatabase function to fetch data

      // Check if the students data exists
      if (!students || students.length === 0) {
        return res.status(500).send('Cannot load the database');
      }

      // Filter students based on the major
      const filteredStudents = students.filter(student => student.major === major);
      const studentNames = filteredStudents.map(student => student.firstname);

      // Prepare the response message
      const message = `List: ${studentNames.join(', ')}`;

      // Send response with status 200
      res.status(200).send(message);
    } catch (error) {
      // If something goes wrong (database not available)
      res.status(500).send('Cannot load the database');
    }
  }
}

module.exports = StudentsController;
