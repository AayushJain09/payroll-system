import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const EditEmployeeModal = ({ isOpen, employee, onSave, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [totalSalary, setTotalSalary] = useState('');

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setEmail(employee.email);
      setContactNumber(employee.contactNumber);
      setDateOfJoining(new Date(employee.dateOfJoining).toISOString().split('T')[0]);
      setTotalSalary(employee.salary.total);
    }
  }, [employee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contactNumber || !dateOfJoining || !totalSalary) {
      alert('All fields are required');
      return;
    }
    onSave(employee._id, { name, email, contactNumber, dateOfJoining, totalSalary });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Employee"
      className="modal"
      overlayClassName="overlay"
    >
      <h2 className="text-xl mb-4">Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 text-white-700">
          <label className="block  text-sm font-bold mb-2">Name</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Contact Number</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Date of Joining</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            value={dateOfJoining}
            onChange={(e) => setDateOfJoining(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Total Salary</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            value={totalSalary}
            onChange={(e) => setTotalSalary(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditEmployeeModal;
