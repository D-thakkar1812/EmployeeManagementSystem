import React from "react";
import { Navbar as BootstrapNavbar, Nav } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

class Navbar extends React.Component {
 render() {
    return (
      <BootstrapNavbar style={{ backgroundColor: "#007bff" }}>
        <BootstrapNavbar.Brand href="/" style={{ color: "#ffffff" }}>
          <h2>Employee Management System</h2>
        </BootstrapNavbar.Brand>
        <Nav>
          <Nav.Link href="/#/directory" style={{ color: "#ffffff" }}>Employee Database</Nav.Link>
          <Nav.Link href="/#/empCreate" style={{ color: "#ffffff" }}>Add Employee</Nav.Link>
          <Nav.Link href="/#/empRetirement" style={{ color: "#ffffff" }}>About TO Retire</Nav.Link>
        </Nav>
      </BootstrapNavbar>
    );
 }
}

export default Navbar;