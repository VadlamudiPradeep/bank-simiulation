const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course');


router.post('/coursePOST', courseController.createCourse);


router.get('/courseGet', courseController.getAllCourses);

module.exports = router;
