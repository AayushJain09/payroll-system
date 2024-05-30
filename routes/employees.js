// routes/employees.js
const router = require('express').Router();
const employeeController = require('../controllers/employee.controller');

router.route('/').get(employeeController.getAllEmployees);
router.route('/add').post(employeeController.addEmployee);
router.route('/:id').get(employeeController.getEmployeeById);
router.route('/:id').delete(employeeController.deleteEmployee);
router.route('/update/:id').post(employeeController.updateEmployee);

module.exports = router;
