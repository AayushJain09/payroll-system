const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dateOfJoining: { type: Date, required: true },
    salary: {
        basic: { type: Number, required: true },
        hra: { type: Number, required: true },
        da: { type: Number, required: true },
        total: { type: Number, required: true },
    },
}, {
    timestamps: true,
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
