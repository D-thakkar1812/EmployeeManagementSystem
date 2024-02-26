import React from "react";
import '../public/employeeTable.css';
import { Table,Button } from "react-bootstrap";
class EmployeeTable extends React.Component {
  renderTableHeader() {
    const headerList = [
      "FirstName",
      "LastName",
      "Age",
      "DateOfJoining",
      "Title",
      "Department",
      "EmployeeType",
      "CurrentStatus",
      "Actions",
    ];

    return headerList.map((header, index) => (
      <th key={index}>{header}</th>
    ));
  }

  renderTableBody() {
    const { employees, onDeleteClick } = this.props;

    return employees.map((emp, index) => (
      <tr key={index}>
        <td>{emp.FirstName}</td>
        <td>{emp.LastName}</td>
        <td>{emp.Age}</td>
        <td>{emp.DateOfJoining.toDateString()}</td>
        <td>{emp.Title}</td>
        <td>{emp.Department}</td>
        <td>{emp.EmployeeType}</td>
        <td>{emp.CurrentStatus}</td>
        <td className="actions">
          <Button
            onClick={() => window.location.href = `/#/empEdit?id=${emp.id}`}
            className="icon-button"
          >
            
            Update/Details
          </Button>
          <Button
            onClick={() => onDeleteClick(emp.id)}
            className="icon-button"
          >
            
            Delete
          </Button>
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <section className="employee-table-container">
        <h3 >
              EMPLOYEE LIST
        </h3>
        <Table className="employee-table">
          <caption>
            
          </caption>
          <thead>
            <tr>{this.renderTableHeader()}</tr>
          </thead>
          <tbody>{this.renderTableBody()}</tbody>
        </Table>
      </section>
    );
  }
}

export default EmployeeTable;
