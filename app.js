
const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./util/database');
const courseRouter = require('./router/course');




app.use(cors());
app.use(express.json());
app.use('/course' , courseRouter)


sequelize
  .sync()
  .then(() => {
    console.log('Database connection has been established successfully.');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });