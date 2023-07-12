const createAccountButton = document.getElementById('createAccountButton');
const formContainer = document.getElementById('formContainer');
const bankAccountForm = document.getElementById('bankAccountForm');

createAccountButton.addEventListener('click', function() {
    formContainer.style.display = 'block';
});

bankAccountForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the form values
    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const pincode = document.getElementById('pincode').value;
    const aadharNo = document.getElementById('aadharNo').value;
    const panNo = document.getElementById('panNo').value;

    // Create an object to store the form data
    const formData = {
        name: name,
        gender: gender,
        email: email,
        phone: phone,
        address: address,
        pincode: pincode,
        aadharNo: aadharNo,
        panNo: panNo
    };

    // Store the form data in the local storage
    localStorage.setItem('bankAccountData', JSON.stringify(formData));
// axios.post('http://localhost:4000/user/CreateUser' , formData).then((response)=>{
//     console.log(response.data.message)
//     alert(response.data.message)
// })
// .catch((err)=>{
//     console.log(err)
// })
    // Clear the form fields
    bankAccountForm.reset();

    // Hide the form
    formContainer.style.display = 'none';

    // Display a success message
    alert('Form data has been stored in the local storage!');
});