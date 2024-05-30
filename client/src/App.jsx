import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/AddEmployee";
import SalaryManagement from "./components/SalaryManagement";
import EditEmployeeModal from "./components/EditEmployeeModal";
import PayrollPage from "./components/PayrollPage";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [activeTab, setActiveTab] = useState("employeeList");
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [addingEmployee, setAddingEmployee] = useState(false);

  const fetchEmployees = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/employees");
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleSaveEmployee = useCallback(
    async (employee) => {
      try {
        await axios.post("http://localhost:5000/employees/add", employee);
        fetchEmployees();
      } catch (error) {
        console.error("Error adding employee:", error);
      }
    },
    [fetchEmployees]
  );

  const handleEditEmployee = useCallback(
    async (id, updatedEmployee) => {
      try {
        await axios.post(
          `http://localhost:5000/employees/update/${id}`,
          updatedEmployee
        );
        closeEditModal();
        fetchEmployees();
      } catch (error) {
        console.error("Error editing employee:", error);
      }
    },
    [fetchEmployees]
  );

  const handleDeleteEmployee = useCallback(
    async (id) => {
      try {
        await axios.delete(`http://localhost:5000/employees/${id}`);
        fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    },
    [fetchEmployees]
  );


  const handleAddEmployee = () => {
    setAddingEmployee(!addingEmployee);
  };
  const openEditModal = (employee) => {
    setEditingEmployee(employee);
  };

  const closeEditModal = () => {
    setEditingEmployee(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee Management System</h1>
      <div className="flex mb-4">
        <button
          className={`mr-4 px-4 py-2 ${
            activeTab === "employeeList"
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("employeeList")}
        >
          All Employee List
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "payroll" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("payroll")}
        >
          Payroll
        </button>
      </div>
      {activeTab === "employeeList" && (
        <>
          <div className="mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleAddEmployee}
            >
             {addingEmployee ? "Cancel" : "Add Employee"}
            </button>
            {addingEmployee && <AddEmployee onSave={handleSaveEmployee} />}
          </div>
          <EmployeeList
            employees={employees}
            onEdit={openEditModal}
            onDelete={handleDeleteEmployee}
          />
          {editingEmployee && (
            <EditEmployeeModal
              isOpen={!!editingEmployee}
              employee={editingEmployee}
              onSave={handleEditEmployee}
              onClose={closeEditModal}
            />
          )}
        </>
      )}
      {activeTab === "payroll" && <PayrollPage />}
    </div>
  );
};

export default App;
