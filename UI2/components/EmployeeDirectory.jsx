import React, { Component } from "react";
import EmployeeSearch from "./EmployeeSearch.jsx";
import EmployeeTable from "./EmployeeTable.jsx";
import EmployeeFunctions, { deleteEmployee, getEmployeesByFilter } from "../EmployeeFunctions.js";
import '../public/edirectory.css';
class EmployeeDirectory extends Component {
  state = {
    employees: [],
    employeeFilter: "",
  };

  componentDidMount() {
    this.updateEmployeeList();
  }

  onDeleteClick = async (id) => {
    try {
      await deleteEmployee(id);
      this.updateEmployeeList();
      
    } catch (error) {
      throw error;
    }
  };

  onFilterChange = async (filter) => {
    this.setState({
      employees: await getEmployeesByFilter(filter),
    });
  };

  updateEmployeeList = async () => {
    const data = await getEmployeesByFilter(
      this.state.employeeFilter
    );
    this.setState({ employees: data });
  };

  render() {
    const { employees } = this.state;

    return (
      <div className="employee-directory-container ">
        <EmployeeSearch onFilterChange={this.onFilterChange} />
        <EmployeeTable
          employees={employees}
          onDeleteClick={this.onDeleteClick}
        />
      </div>
    );
  }
}

export default EmployeeDirectory;
