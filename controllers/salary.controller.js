const Salary = require('../models/salary.model');
const Employee = require('../models/employee.model');


// function to get all salaries
exports.getAllSalaries = async (req, res) => {
    try {
        const salaries = await Salary.find().populate('employee');
        res.json(salaries);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
};

// function to add salaries for employees
exports.addSalary = async (req, res) => {
    try {
        const salaryData = req.body;
        const newSalaries = await Salary.insertMany(salaryData);
        res.json('Salaries added!');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
};

// function to search for unpaid employees for a specific month and year
exports.searchUnpaidEmployees = async (req, res) => {
    const { month, year } = req.body;
    try {
        const employees = await Employee.find({ dateOfJoining: { $lte: new Date(year, month - 1) } });
        const salaries = await Salary.find({ month, year });
        const paidEmployeeIds = salaries.map(salary => salary.employee.toString());
        const unpaidEmployees = employees.filter(employee => !paidEmployeeIds.includes(employee._id.toString()));
        res.json(unpaidEmployees);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
};

// Function to search for employees whose salary has been generated for a specific month and year
exports.searchPaidEmployees = async (req, res) => {
    const { month, year } = req.body;
    try {
        // Find salaries for the specified month and year
        const salaries = await Salary.find({ month, year }).populate('employee');

        if (salaries.length === 0) {
            return res.status(404).json('No salaries found for the specified month and year');
        }

        // Prepare the result data with required fields from both salary and employee documents
        const result = salaries.map(salary => ({
            employeeId: salary.employee._id,
            name: salary.employee.name,
            joiningDate: salary.employee.dateOfJoining,
            basic: salary.employee.salary?.basic || 0,
            hra: salary.employee.salary?.hra || 0,
            da: salary.employee.salary?.da || 0,
            payDays: salary.payDays,
            genSalary: salary.totalSalary,
            totalSalary : salary.employee.salary?.total ||0,
            month: salary.month,
            year: salary.year
        }));

        res.json(result);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
};