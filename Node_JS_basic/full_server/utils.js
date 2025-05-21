// full_server/utils.js
const fs = require('fs');

// Function to read the student database
function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    // Read the file asynchronously
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) return reject(new Error('Cannot load the database'));

      const lines = data.trim().split('\n');
      const fields = {};

      // Skip the header line and process each subsequent line
      lines.slice(1).forEach(line => {
        const [firstname, , , field] = line.split(',');

        // Proceed only if firstname and field are present
        if (firstname && field) {
          // Initialize the array for the field if it doesn't exist
          if (!fields[field]) fields[field] = [];

          // Add the student's firstname to the corresponding field
          fields[field].push(firstname);
        }
      });

      // Resolve the promise with the grouped data
      resolve(fields);
    });
  });
}

module.exports = { readDatabase };
