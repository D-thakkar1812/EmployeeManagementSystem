import React from "react";
import { Form, Container, Row, Col, InputGroup } from "react-bootstrap";
import '../public/filter.css';

class EmployeeSearch extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
      employeeType: "",
    };

    this.employeeTypeChangeHandler = this.employeeTypeChangeHandler.bind(this);
 }

 employeeTypeChangeHandler(evt) {
    const { value } = evt.target;
    this.setState({ employeeType: value });
    this.props.onFilterChange(value);
 }

 render() {
    const { employeeType } = this.state;

    return (
      <Container>
        <Row>
          <Col md={6} offset={{ md: 3 }}>
            <h3 className="header_filter">Filter By Employee Type:</h3>
            <Form.Control
              as="select"
              onChange={this.employeeTypeChangeHandler}
              name="EmployeeType"
              id="EmployeeType"
              value={employeeType}
              style={{backgroundColor: "#f8f9fa", color: "#212529"}}
            >
              <option value="">All Employees</option>
              <option value="FullTime">FullTime</option>
              <option value="PartTime">PartTime</option>
              <option value="Contract">Contract</option>
              <option value="Seasonal">Seasonal</option>
            </Form.Control>
          </Col>
        </Row>
      </Container>
    );
 }
}

export default EmployeeSearch;