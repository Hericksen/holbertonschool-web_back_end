// full_server/routes/index.js
const express = require('express');
const AppController = require('../controllers/AppController');
const StudentsController = require('../controllers/StudentsController');

const router = express.Router();

// Route to the homepage, handled by AppController
router.get('/', AppController.getHomepage);

// Route to get all students, handled by StudentsController
router.get('/students', StudentsController.getAllStudents);

// Route to get students by major, handled by StudentsController
router.get('/students/major/:major', StudentsController.getAllStudentsByMajor);

module.exports = router;
