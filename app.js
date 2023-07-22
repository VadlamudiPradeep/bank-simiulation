const express = require('express');
const app = express();
const dotenv = require('dotenv');
const sequelize = require('./util/database');
var cors = require('cors');


let userRoutes = require('./routes/userRoutes');

let updatedKYC = require('./routes/update');
let ledgerRoutes = require('./routes/ledger'); // Fix the import here

// models
let Account = require('./models/Account');
let Ledger = require('./models/ledger');

dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);

app.use('/Deposite', ledgerRoutes); // Use the correct route here
app.use('/update', updatedKYC);

Account.hasMany(Ledger);
Ledger.belongsTo(Account);

sequelize
//.sync({force:true})
.sync()
  .then(() => {
    app.listen(4000, () => {
      console.log('Server is running on port 4000');
    });
  })
  .catch(err => {
    console.log(err);
  });