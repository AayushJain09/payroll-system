const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const employeeRouter = require('./routes/employees');
const salaryRouter = require('./routes/salaries');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/employees', employeeRouter);
app.use('/salaries', salaryRouter);

// MongoDB connection
const uri = //mongo string
mongoose.connect(uri)
.then(() => {
    console.log('MongoDB database connection established successfully');
})
.catch(err => {
    console.error(`Error connecting to MongoDB: ${err.message}`);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
