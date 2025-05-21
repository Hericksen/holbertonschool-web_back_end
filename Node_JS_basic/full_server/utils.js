// full_server/utils.js
const fs = require('fs');
const path = require('path');

// Function to read the student database
function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    // Resolve the full path to avoid relative path issues
    const fullPath = path.resolve(filePath);

    // Read the file asynchronously
    fs.readFile(fullPath, 'utf-8', (err, data) => {
      if (err) {
        // Reject the promise if there's an error reading the file
        return reject(err);
      }

      try {
        // Parse the file content (assuming it's JSON format)
        const students = JSON.parse(data);

        // Group students by field
        const groupedByField = {};

        students.forEach(student => {
          const field = student.field.toLowerCase();  // Make the field case insensitive

          // Ensure the field is already in the object, or create a new array
          if (!groupedByField[field]) {
            groupedByField[field] = [];
          }

          // Add the student's first name to the corresponding field
          groupedByField[field].push(student.firstname);
        });

        // Resolve the promise with the grouped data
        resolve(groupedByField);
      } catch (parseError) {
        // Reject the promise if JSON parsing fails
        reject(new Error('Failed to parse database file'));
      }
    });
  });
}

module.exports = { readDatabase };
