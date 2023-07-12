let token = localStorage.getItem('token')
    
const depositForm = document.getElementById('depositForm');



depositForm.addEventListener('submit', depositMoney);
function depositMoney(event) {
    event.preventDefault(); // Prevent form submission


    const amount = document.getElementById('amount').value;
localStorage.setItem('amount' , amount)

    axios.post('http://localhost:4000/Deposite/DepositMoney',  amount  , {headers:{'Authorization':token}})
    .then(response =>{
      

     
        document.getElementById('amount').value = '';

        alert('Deposit successful!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during the deposit.');
    });
};

document.addEventListener('DOMContentLoaded', () => {
  const transferForm = document.getElementById('transferForm');
  const receiveForm = document.getElementById('receiveForm');

  // Event listener for transferring money
  transferForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const toName = document.getElementById('toName').value;
    const amount = document.getElementById('transferAmount').value;
    let data = {
      toName: toName , 
      amount :amount
    }
    transferMoney(data);
  });

  // Event listener for receiving money
  receiveForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fromName = document.getElementById('fromName').value;
    const amount = document.getElementById('receiveAmount').value;
    let data = {
      fromName , fromName , amount:amount
    }
    receiveMoney(data);
  });

  // Function to transfer money
  function transferMoney(data) {
    
    axios.post('http://localhost:4000/deposite/Transfer',
    data,
    {headers:{'Authorization':token}})
      .then(response => 
  {
        if (response.data.success) {
          // Transfer successful
          displayMessage('Transfer successful', 'success');
        } else {
          // Failed to transfer money
          displayMessage('Failed to transfer money', 'error');
        }
      })
      .catch(error => {
        // Handle error
        displayMessage('An error occurred while transferring money', 'error');
      });
  }

  // Function to receive money
  function receiveMoney(data) {
    axios.post('http://localhost:4000/deposite/Receive',
       data,
      {headers: { "Authorization":token }}
    )
      .then(response =>  {
        if (response.data.success) {
       
          displayMessage('Money received successfully', 'success');
        } else {
      
          displayMessage('Failed to receive money', 'error');
        }
      })
      .catch(error => {
      
        displayMessage('An error occurred while receiving money', 'error');
      });
  }

  // Function to display success or error message
  function displayMessage(message, type) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.className = type;
  }
});




const withdrawForm = document.getElementById('withdrawForm');

withdrawForm.addEventListener('submit', withdrawMoney);

function withdrawMoney(event) {
  event.preventDefault();
  
  const withdrawAmount = document.getElementById('withdrawAmount').value;
  console.log(withdrawAmount)

  axios.post('http://localhost:4000/deposite/WithdrawMoney', 
  withdrawAmount , 
  {headers:{'Authorization':token}} )
  .then(response =>{
  
   alert(response.data.message);
   updateBalance();
  })
  .catch(error => {
    console.error('Error:', error);
   
  })
}

  function updateBalance() {

  axios.get('http://localhost:4000/deposite/getWithdrawMoney' , 
  {headers:{'Authorization':token}})
    .then(response => {
  
      const balanceElement = document.getElementById('balance');
      balanceElement.textContent = `Current Balance: ${response.data.balance}`;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


let printStatementBtn = document.getElementById('printStatementBtn');
printStatementBtn.addEventListener('click', onsubmit); 
let print = document.getElementById('print')
async function onsubmit(e){
  try{
  axios.get('http://localhost:4000/user/getStatement' , {headers : {"Authorization":token}}).then(response =>{
    console.log(response.data)
    let ul  = document.createElement('ul');
    response.data.forEach((result)=>{
      ul.innerHTML += `<li>${result.name} - ${result.email} - ${result.amount} - ${result.initialBalance} </li>`;
      print.appendChild(ul)
    })
  }).catch(err=>{
    console.log(err)
  })

  axios.get('http//localhost:4000/Deposite/transactions', {headers : {"Authorization":token}}).then(response=>{
    console.log(response.data)
  }).catch(err=>{
    console.log(err)
  })
  }catch(err){
    console.log(err)
  }
}

let close1 = document.getElementById('closeAccountBtn')
close1.addEventListener('click' , close);

function close(){

let token  = localStorage.getItem('token')
  axios.post('http://localhost:4000/user/closeAccount' , {headers:{'Authorization':token}})
  .then((response)=>{
    console.log(response.data)
    window.location.href = '../createUser/user.html'
  
  })
  .catch((err)=>{
    console.log(err)
  })
}