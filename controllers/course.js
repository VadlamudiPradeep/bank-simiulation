const Course = require('../models/course');

// Controller to create a new course
function isStringValid(string){
  if(string == undefined || string.length == 0){
    return false;
  }else{
    return true
  }
}
const createCourse = async (req, res) => {
  try{
  const { courseName, startDate, lessonComplete, duration } = req.body;


  // // Check if the conversion was successful
  // if ( isStringValid(courseName)|| isStringValid(startDate) || isStringValid(duration)||   isStringValid(lessonComplete)) {
  //   return res.status(400).json({ success: false, message: 'Invalid lessonComplete value' });
  // }

  // Create the course record
  const course = await Course.create({
    courseName,
    startDate,
    lessonComplete: JSON.stringify(lessonComplete),
    duration,
  });

  return res.status(201).json({ success: true, message: 'Course created successfully', course });
} catch (error) {
  console.error('Error creating course:', error);
  return res.status(500).json({ success: false, message: 'Error creating course' });
}
}


// Controller to get all courses
const getAllCourses = async (req, res) => {
  try {
    
    const courses = await Course.findAll();

    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    console.error('Error retrieving courses:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve courses' });
  }
};

module.exports = { createCourse, getAllCourses };
