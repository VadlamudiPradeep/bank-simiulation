

const courseForm = document.getElementById('courseForm');
const courseTable = document.querySelector('#courseTable tbody');

courseForm.addEventListener('submit', submit);

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
      alert(response.data.message);
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
      let result = response.data.data;
      console.log('result :' , result)
  
      if (Array.isArray(result)) {
        let table = document.getElementById('courseTable');

        result.forEach((ele) => {
          let row = document.createElement('tr');

          let courseNameCell = document.createElement('td');
          courseNameCell.textContent = ele.courseName;
          row.appendChild(courseNameCell);

          let startDateCell = document.createElement('td');
          startDateCell.textContent = ele.startDate;
          row.appendChild(startDateCell);

          let lessonCompleteCell = document.createElement('td');
          lessonCompleteCell.textContent = ele.lessonComplete;
          row.appendChild(lessonCompleteCell);

          let durationCell = document.createElement('td');
          durationCell.textContent = ele.duration;
          row.appendChild(durationCell);

          table.appendChild(row);
        });
      } else {
        console.error('Invalid response data format:', result);
      }
    })
    .catch((error) => {
      console.error('Error retrieving course data:', error);
    });
});

