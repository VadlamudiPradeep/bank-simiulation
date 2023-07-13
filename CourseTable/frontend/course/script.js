let table = document.querySelector('#courseTable tbody');


const courseForm = document.getElementById('courseForm');
const courseTable = document.querySelector('#courseTable tbody');

courseForm.addEventListener('submit', submit);

// Function to render the course data in the table
function renderCourse(course) {
  let tr = document.createElement('tr');
  tr.innerHTML = `${result.courseName}-${result.startDate}-${result.lessonComplete} - ${result.duration}`;

  table.appendChild(tr);
}

// Function to handle form submission
function submit(e) {
  e.preventDefault();

  const courseName = document.getElementById('courseName').value;
  const startDate = document.getElementById('startDate').value;
  const lessonComplete = document.getElementById('lessonComplete').value;
  const duration = document.getElementById('duration').value;

  const course = {
    courseName: courseName,
    startDate: startDate,
    lessonComplete: lessonComplete,
    duration: duration
  };

  axios
    .post('http://localhost:3000/course/coursePOST', course)
    .then((response) => {
      const createdCourse = response.data;
      renderCourse(createdCourse);
      courseForm.reset();
    })
    .catch((error) => {
      console.error('Error creating course:', error);
    });
}

window.addEventListener('DOMContentLoaded', () => {
  axios
    .get('http://localhost:3000/course/courseGet')
    .then((response) => {
      console.log('Response:', response);
      if (Array.isArray(response.data)) {
        response.data.forEach((result) => {
          let tr = document.createElement('tr');
          tr.innerHTML = `${result.courseName}-${result.startDate}-${result.lessonComplete} - ${result.duration}`;

          table.appendChild(tr);
        });
      } else {
        console.error('Invalid response data format:', response.data);
      }
    })
    .catch((error) => {
      console.error('Error retrieving course data:', error);
    });
});
