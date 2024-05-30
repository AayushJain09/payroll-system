const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    month: { type: String, required: true },
    year: { type: String, required: true },
    payDays: { type: Number, required: true },
    totalSalary: { type: Number, required: true },
}, {
    timestamps: true,
});

const Salary = mongoose.model('Salary', salarySchema);

module.exports = Salary;
