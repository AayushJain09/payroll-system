

import { useState, useEffect } from "react";
import axios from "axios";

const SalaryManagement = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [payDays, setPayDays] = useState({});
  const [selectedEmployees, setSelectedEmployees] = useState({});
  const [error, setError] = useState("");

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  useEffect(() => {
    if (selectedDate) {
      const [year, month] = selectedDate.split("-");
      axios
        .post("http://localhost:5000/salaries/searchpaid", { month, year })
        .then((res) => {
          setFilteredEmployees(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.error("Error fetching unpaid employees:", error);
        });
    }
  }, [selectedDate]);

  const handlePayDaysChange = (e, employeeId) => {
    const { value } = e.target;
    const [year, month] = selectedDate.split("-");
    const daysInMonth = getDaysInMonth(month, year);

    if (value > daysInMonth) {
      setError(`Pay days cannot exceed ${daysInMonth} for the selected month.`);
      return;
    } else {
      setError("");
    }

    setPayDays((prev) => ({ ...prev, [employeeId]: value }));
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const calculateTotalSalary = (employee) => {
    if (!employee.salary || typeof employee.salary.total !== "number") {
      console.error(`Invalid salary data for employee ${employee._id}`);
      return 0;
    }

    const days = payDays[employeeId] || 0;
    const [year, month] = selectedDate.split("-");
    const daysInMonth = getDaysInMonth(month, year);
    const dailyRate = employee.salary.total / daysInMonth;
    return dailyRate * days;
  };

  const handleGenerateSalary = () => {
    const [year, month] = selectedDate.split("-");
    const selectedDateObj = new Date(year, month - 1);

    const selectedEmployeeIds = Object.keys(selectedEmployees).filter(
      (id) => selectedEmployees[id]
    );

    if (selectedEmployeeIds.length === 0) {
      console.error("No employees selected for salary generation.");
      return;
    }

    const salaryData = selectedEmployeeIds.map((employeeId) => {
      const employee = filteredEmployees.find((e) => e._id === employeeId);
      const joiningDate = new Date(employee.dateOfJoining);

      if (joiningDate > selectedDateObj) {
        console.error(
          `Employee ${employee.name} cannot receive salary for ${selectedDate} as they joined on ${employee.dateOfJoining}`
        );
        return null;
      }

      const totalSalary = calculateTotalSalary(employee);

      if (totalSalary <= 0) {
        console.error(
          `Invalid total salary for employee ${employee.name}: ${totalSalary}`
        );
        return null;
      }

      return {
        employee: employee._id,
        month,
        year,
        payDays: payDays[employee._id] || 0,
        totalSalary,
      };
    }).filter(Boolean);

    if (salaryData.length === 0) {
      return;
    }

    axios
      .post("http://localhost:5000/salaries/add", salaryData)
      .then(() => {
        setFilteredEmployees((prev) =>
          prev.filter((e) => !selectedEmployeeIds.includes(e._id))
        );
        setPayDays((prev) => {
          const newPayDays = { ...prev };
          selectedEmployeeIds.forEach((id) => delete newPayDays[id]);
          return newPayDays;
        });
        setSelectedEmployees({});
      })
      .catch((error) => {
        console.error("Error generating salary:", error);
        if (error.response) {
          console.error(error.response.data);
        }
      });
  };

  const handleCheckboxChange = (e, employeeId) => {
    const { checked } = e.target;
    setSelectedEmployees((prev) => ({ ...prev, [employeeId]: checked }));
  };

  return (
    <section>
      <h1 className="text-5xl text-white mb-4">Edit Payroll</h1>
      <div className="mb-4">
        <label className="block text-white-700 text-sm font-bold mb-2">
          Select Month and Year
        </label>
        <input
          type="month"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {selectedDate && filteredEmployees.length > 0 && (
        <div>
          <table className="min-w-full bg-white text-black">
            <thead>
              <tr>
                <th className="py-2">Select</th>
                <th className="py-2">Name</th>
                <th className="py-2">generated Salary</th>
                <th className="py-2">Total Salary</th>
                <th className="py-2">Paydays</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee._id}>
                  <td className="border px-4 py-2">
                    <input
                      type="checkbox"
                      checked={!!selectedEmployees[employee._id]}
                      onChange={(e) => handleCheckboxChange(e, employee._id)}
                    />
                  </td>
                  <td className="border px-4 py-2">{employee.name}</td>
                  <td className="border px-4 py-2">
                    {employee.genSalary.toFixed(2) || 0}
                  </td>
                  <td className="border px-4 py-2">
                    {employee.totalSalary || 0}
                  </td>
                  <td className="border px-4 py-2">{employee.payDays || 0}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
          {/* <div className="mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleGenerateSalary}
            >
              Generate Salary for Selected Employees
            </button>
          </div> */}
        </div>
      )}
    </section>
  );
};

export default SalaryManagement;
