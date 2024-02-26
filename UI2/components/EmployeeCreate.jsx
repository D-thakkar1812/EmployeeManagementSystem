import React from 'react';
import EmployeeFunctions, { createEmployee,getAge } from '../EmployeeFunctions';
import { Container, Row, Col, Form, Button,Alert} from 'react-bootstrap';
import '../public/createEmployee.css'
class EmployeeCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        error: '',
        employeeData: {
            FirstName: '',
            LastName: '',
            Age: '',
            DateOfJoining: '',
            Title: '',
            Department: '',
            EmployeeType: '',
            Phone:'',
            CurrentStatus:'',
            DateOfBirth:'',
        },
    };
    this.addEmployeeHandler = this.addEmployeeHandler.bind(this);
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      employeeData: {
        ...prevState.employeeData,
        [name]: value,
      },
    }));
  };

  validateDateOfBirth = () => {
    const { DateOfBirth } = this.state.employeeData;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(DateOfBirth) && new Date(DateOfBirth) <= new Date();
  };

  validateDateOfJoining = () => {
    const { DateOfJoining } = this.state.employeeData;
    return new Date(DateOfJoining) <= new Date();
  };

  addEmployeeHandler = (evt) => {
    evt.preventDefault();

    const { FirstName, LastName, Title, Department, EmployeeType, Phone, CurrentStatus, DateOfBirth, DateOfJoining } = this.state.employeeData;

    if (!this.validateDateOfBirth()) {
      this.setState({ error: 'Please enter a valid date of birth in the format yyyy-mm-dd or a date in the past.' });
      return;
    }

    if (!this.validateDateOfJoining()) {
      this.setState({ error: 'Date of Joining cannot be in the future.' });
      return;
    }

    if (!FirstName || !LastName || !Title || !Department || !EmployeeType || !Phone || !CurrentStatus) {
      this.setState({ error: 'Please fill in all required fields.' });
      return;
    }

    const Age = getAge(DateOfBirth);
    if(Age<=18 || Age>65){
      this.setState({ error: 'Age Crieteria is not matching so Modify the Birthdate if you are entering it wrongly' });
      return;
    }
    const employee = { FirstName, LastName, Age, DateOfJoining, Title, Department, EmployeeType, Phone, CurrentStatus, DateOfBirth };
    createEmployee(employee);
  };

  render() {
    
    return (
      <Container className="create-form mt-3">
        <center>
          <h3>
            <u>ADD EMPLOYEE</u>
          </h3>
          <Form>
            

                        <Row>
                            <Col md={12}>
                              <Form.Group controlId="FirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="FirstName"
                                  value={this.state.employeeData.FirstName}
                                  onChange={this.handleInputChange}
                                  placeholder="First Name"
                                />
                              </Form.Group>
                            </Col>
                          </Row>

                        

                        <Row>
                          <Col md={12}>
                            <Form.Group controlId="LastName">
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="LastName"
                                value={this.state.employeeData.LastName}
                                onChange={this.handleInputChange}
                                placeholder="Last Name"
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        
                        <Row>
                          <Col md={12}>
                            <Form.Group controlId="Phone">
                              <Form.Label>Phone Number</Form.Label>
                              <Form.Control
                                type="text"
                                name="Phone"
                                value={this.state.employeeData.Phone}
                                onChange={this.handleInputChange}
                                placeholder="Phone"
                              />
                            </Form.Group>
                          </Col>
                        </Row>


                        <Row>
                          <Col md={12}>
                            <Form.Group controlId="Title">
                              <Form.Label>Employee Title</Form.Label>
                              <Form.Control
                                as="select"
                                name="Title"
                                value={this.state.employeeData.Title}
                                onChange={this.handleInputChange}
                              >
                                <option value="">Select Employee Title</option>
                                <option value="Employee">Employee</option>
                                <option value="Manager">Manager</option>
                                <option value="Director">Director</option>
                                <option value="VP">VP</option>
                              </Form.Control>
                            </Form.Group>
                          </Col>
                        </Row>




                      <Row>
                        <Col md={12}>
                          <Form.Group controlId="CurrentStatus">
                            <Form.Label>Current Status</Form.Label>
                            <Form.Control
                              as="select"
                              name="CurrentStatus"
                              value={this.state.employeeData.CurrentStatus}
                              onChange={this.handleInputChange}
                            >
                              <option value="">Select Current Status</option>
                              <option value="Working">Working</option>
                              <option value="Retired">Retired</option>
                              <option value="Terminated">Terminated</option>
                              <option value="Resigned">Resigned</option>
                            </Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={12}>
                          <Form.Group controlId="DateOfBirth">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                              type="text"
                              name="DateOfBirth"
                              value={this.state.employeeData.DateOfBirth}
                              placeholder="DateOfBirth should be in form of yyyy-mm-dd"
                              onChange={this.handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                          <Col md={12}>
                            <Form.Group controlId="Age">
                              <Form.Label>Age</Form.Label>
                              <Form.Control
                                type="number"
                                name="Age"
                                value={this.state.employeeData.Age}
                                placeholder="Age"
                                min="20"
                                max="70"
                                onChange={this.handleInputChange}
                              />
                            </Form.Group>
                          </Col>
                      </Row>


                      <Row>
                        <Col md={12}>
                          <Form.Group controlId="Department">
                            <Form.Label>Department</Form.Label>
                            <Form.Control
                              as="select"
                              name="Department"
                              value={this.state.employeeData.Department}
                              onChange={this.handleInputChange}
                            >
                              <option value="">Select Department</option>
                              <option value="IT">IT</option>
                              <option value="Marketing">Marketing</option>
                              <option value="HR">HR</option>
                              <option value="Engineering">Engineering</option>
                            </Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={12}>
                          <Form.Group controlId="EmployeeType">
                            <Form.Label>Employee Type</Form.Label>
                            <Form.Control
                              as="select"
                              name="EmployeeType"
                              value={this.state.employeeData.EmployeeType}
                              onChange={this.handleInputChange}
                            >
                              <option value="">Select Employee Type</option>
                              <option value="FullTime">Full Time</option>
                              <option value="PartTime">Part Time</option>
                              <option value="Seasonal">Seasonal</option>
                              <option value="Contract">Contract</option>
                            </Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={12}>
                          <Form.Group controlId="DateOfJoining">
                            <Form.Label>Date of Joining</Form.Label>
                            <Form.Control
                              type="date"
                              id="DateOfJoining"
                              name="DateOfJoining"
                              value={this.state.employeeData.DateOfJoining}
                              onChange={this.handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>



                      <Row>
                        <Col md={12}>
                          <div className="row">
                            <div className="button_wrapper">
                              <Button variant="primary" onClick={this.addEmployeeHandler}>
                                Add Employee
                              </Button>
                            </div>
                          </div>
                        </Col>
                      </Row>

                    


                        <Row className="mt-3">
                          <Col md={12}>
                            <Alert variant="danger">
                              {this.state.error && <pre>{this.state.error}</pre>}
                            </Alert>
                          </Col>
                        </Row>

            
          </Form>
        </center>
      </Container>
    );
  }
}

export default EmployeeCreate;
