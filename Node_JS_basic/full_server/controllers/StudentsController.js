// full_server/controllers/StudentsController.js
const { readDatabase } = require('../utils');
const dbFile = process.argv[2] || '';

class StudentsController {
  // Method to get all students and display them by field
  static async getAllStudents(req, res) {
    try {
      const fields = await readDatabase(dbFile);

      // Check if the students data exists
      if (!fields || fields.length === 0) {
        return res.status(500).send('Cannot load the database');
      }

      // Prepare the response message
      let message = 'This is the list of our students\n';
      for (const field in fields) {
        message += `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}\n`;
      }

      // Send response with status 200
      res.status(200).send(message.trim());
    } catch (err) {
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
      const students = await readDatabase(dbFile);  // Call the readDatabase function to fetch data

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
