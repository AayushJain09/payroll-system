import React from "react";
import SalaryManagement from "./SalaryManagement";
import EditSalary from "./EditSalary";

const PayrollPage = ({ employees }) => {
  return (
    <>
      <SalaryManagement employees={employees} />
      <EditSalary employees={employees} />
    </>
  );
};

export default PayrollPage;
