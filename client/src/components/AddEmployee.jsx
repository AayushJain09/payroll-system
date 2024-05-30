import { useState, useCallback, useEffect } from "react";

const AddEmployee = ({ onSave }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [totalSalary, setTotalSalary] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!totalSalary || isNaN(totalSalary)) {
        alert("Please enter a valid total salary");
        return;
      }
      const salary = {
        base: totalSalary * 0.5,
        hra: totalSalary * 0.25,
        da: totalSalary * 0.25,
      };
      const newEmployee = { name, email, contact, dateOfJoining, totalSalary: Number(totalSalary) };
      console.log("Sending data:", newEmployee); // Debugging step

      onSave(newEmployee);
      setName("");
      setEmail("");
      setContact("");
      setDateOfJoining("");
      setTotalSalary("");
    },
    [onSave, name, email, contact, dateOfJoining, totalSalary]
  );

  useEffect(() => {
    setName("");
    setEmail("");
    setContact("");
    setDateOfJoining("");
    setTotalSalary("");
  }, []);

  return (
    <form className="w-full max-w-lg" onSubmit={handleSubmit}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Email
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Contact Number
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Date of Joining
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="date"
            value={dateOfJoining}
            onChange={(e) => setDateOfJoining(e.target.value)}
            required
            pattern="\d{4}-\d{2}-\d{2}"
          />
        </div>
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Total Salary
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="number"
            value={totalSalary}
            onChange={(e) => setTotalSalary(e.target.value)}
            required
          />
        </div>
        <div className="w-full px-3">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddEmployee;
