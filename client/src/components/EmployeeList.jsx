import React from 'react';

const EmployeeList = ({ employees, onEdit, onDelete }) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Employees</h2>
      <table className="min-w-full bg-white text-black">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Contact</th>
            <th className="py-2">Date of Joining</th>
            <th className="py-2">Total Salary</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td className="border px-4 py-2">{employee.name}</td>
              <td className="border px-4 py-2">{employee.email}</td>
              <td className="border px-4 py-2">{employee.contactNumber}</td>
              <td className="border px-4 py-2">{new Date(employee.dateOfJoining).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{employee.salary.total}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => onEdit(employee)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => onDelete(employee._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
