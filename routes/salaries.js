
const router = require('express').Router();
const salaryController = require('../controllers/salary.controller');

router.route('/').get(salaryController.getAllSalaries); // route for fetching all salaries
router.route('/add').post(salaryController.addSalary); // route for adding salaries
router.route('/search').post(salaryController.searchUnpaidEmployees); // route for searching unpaid employees
router.route('/searchpaid').post(salaryController.searchPaidEmployees); // route for searching unpaid employees

module.exports = router;
