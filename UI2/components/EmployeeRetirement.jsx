import React, { Component } from "react";
import EmployeeSearch from "./EmployeeSearch.jsx";
import EmployeeTable from "./EmployeeTable.jsx";
import EmployeeFunctions, {  getEmployeesByFilterRetirement } from "../EmployeeFunctions.js";
import '../public/edirectory.css';
class EmployeeRetirement extends Component {
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
    try {
      console.log(filter);
      const employees = await getEmployeesByFilterRetirement(filter);
      console.log('Retrieved employees:', employees);
      this.setState({
        employees,
      });
    } catch (error) {
      console.error('Error in getEmployeesByFilterRetirement:', error);
      // Handle error as needed
    }
  };

  updateEmployeeList = async () => {
    const data = await getEmployeesByFilterRetirement(
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

export default EmployeeRetirement;
