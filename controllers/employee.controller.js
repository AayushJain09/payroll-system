const Employee = require('../models/employee.model');

exports.getAllEmployees = (req, res) => {
    Employee.find()
        .then(employees => res.json(employees))
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.addEmployee = (req, res) => {
    const { name, email, contact, dateOfJoining, totalSalary } = req.body;

    console.log("Received data:", req.body); // Debugging step

    // Validate fields
    if (!name || !contact || !email || !dateOfJoining || !totalSalary) {
        return res.status(400).json('Error: All fields are required');
    }

    const basic = totalSalary * 0.50;
    const hra = totalSalary * 0.25;
    const da = totalSalary * 0.25;

    const newEmployee = new Employee({
        name,
        contactNumber: contact,  // Assuming contactNumber maps to contact
        email,
        dateOfJoining: new Date(dateOfJoining),
        salary: {
            basic,
            hra,
            da,
            total: totalSalary
        }
    });

    newEmployee.save()
        .then(() => res.json('Employee added!'))
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.getEmployeeById = (req, res) => {
    Employee.findById(req.params.id)
        .then(employee => res.json(employee))
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.updateEmployee = (req, res) => {
    Employee.findById(req.params.id)
        .then(employee => {
            if (!employee) return res.status(404).json('Employee not found');

            const { name, contactNumber, email, dateOfJoining, totalSalary } = req.body;
            if (!name || !contactNumber || !email || !dateOfJoining || !totalSalary) {
                return res.status(400).json('Error: All fields are required');
            }

            employee.name = name;
            employee.contactNumber = contactNumber;
            employee.email = email;
            employee.dateOfJoining = new Date(dateOfJoining);
            employee.salary.basic = totalSalary * 0.50;
            employee.salary.hra = totalSalary * 0.25;
            employee.salary.da = totalSalary * 0.25;
            employee.salary.total = totalSalary;

            employee.save()
                .then(() => res.json('Employee updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.deleteEmployee = (req, res) => {
    Employee.findByIdAndDelete(req.params.id)
        .then(() => res.json('Employee deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
};
