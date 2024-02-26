import React, { Component } from 'react';
import { getEmployeeById, updateEmployee,getAge } from '../EmployeeFunctions';
import { Container, Row, Col, Form, Button,Alert} from 'react-bootstrap';


class EmployeeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error:'',
      empId: null,
      employeeData: {
        FirstName: '',
        LastName: '',
        Age: '',
        Title: '',
        Department: '',
        Phone: '',
        CurrentStatus: '',
        EmployeeType: '',
        
        DateOfJoining:'',

        DateOfBirth:'',
      },
      timeRemainingForRetirement: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async componentDidMount() {
    // Extract empId from the URL parameter

    const { match } = this.props;
    console.log(match);

    function extractIdFromUrl(url) {
      // Use URLSearchParams to get the query parameters
      const params = new URLSearchParams(new URL(url).search);

      // Get the value of the 'id' parameter
      const id = params.get('id');

      return id;
    }
    const calculateTimeRemainingForRetirement = (dateOfBirth) => {
      const retirementAge = 65; // Assuming retirement age is 65
    
      // Calculate the retirement date based on DateOfBirth
      const birthDate = new Date(dateOfBirth);
      const retirementDate = new Date(birthDate.getFullYear() + retirementAge, birthDate.getMonth(), birthDate.getDate());
    
      // Calculate the remaining time until retirement
      const today = new Date();
      const timeRemaining = retirementDate - today;
    
      // Convert milliseconds to years, months, and days
      const yearsRemaining = Math.floor(timeRemaining / (365.25 * 24 * 60 * 60 * 1000));
      const monthsRemaining = Math.floor((timeRemaining % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000));
      const daysRemaining = Math.floor((timeRemaining % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
    
      // Construct the remaining time string
      const remainingTime =
        yearsRemaining > 0
          ? `${yearsRemaining} years, ${monthsRemaining} months, ${daysRemaining} days`
          : 'Retired';
    
      return remainingTime;
    };
    
  


    console.log('Props:', this.props);

    const empId = Number(extractIdFromUrl(window.location.href.replace("/#", "")));
    console.log(empId);



    // Fetch employee data by id
    try {
      const employeeData = await getEmployeeById(empId);
      console.log("Employee data",JSON.stringify(employeeData));
      const timeRemainingForRetirement = calculateTimeRemainingForRetirement(employeeData.DateOfBirth);
      this.setState({
        empId,
        employeeData,
        timeRemainingForRetirement,
      });
    } catch (error) {
      console.error('Error fetching employee data:', error);
      // Handle error appropriately (e.g., show an error message)
    }
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
  


  validateFields = () => {
    const { FirstName, LastName, Title, Department, EmployeeType, Phone, CurrentStatus } = this.state.employeeData;
  
    if (!FirstName || !LastName) {
      this.setState({ error: 'First and Last Name are required' });
      return false;
    }
  
    if (!Title) {
      this.setState({ error: 'Title is required' });
      return false;
    }
  
    if (!Department) {
      this.setState({ error: 'Department is Required' });
      return false;
    }
  
    if (!EmployeeType) {
      this.setState({ error: 'Employee Type is Required' });
      return false;
    }
  
    if (!CurrentStatus) {
      this.setState({ error: 'Current Status is Required' });
      return false;
    }
  
    if (!Phone) {
      this.setState({ error: 'Phone Number is Required' });
      return false;
    }
  
    // Clear the error state when all fields are valid
    this.setState({ error: '' });
  
    return true;
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
  
  
  handleUpdate = async () => {
    const { empId, employeeData } = this.state;
  
    if (!this.validateFields()) {
      return;
    }
  
    if (!this.validateDateOfBirth()) {
      this.setState({ error: 'DateOfBirth should be in form of yyyy-mm-dd' });
      return;
    }
  
    if (!this.validateDateOfJoining()) {
      this.setState({ error: 'You cannot set up a future value for Date of Joining' });
      return;
    }
  
    try {
      // Calculate age
      const age = getAge(this.state.employeeData.DateOfBirth);
  
      // Check if the calculated age is within the specified range (20 to 65)
      if (age < 20 || age > 65) {
        this.setState({ error: 'Age must be between 20 and 65 years' });
        return;
      }
  
      // Update employee data after setting the age
      await updateEmployee(empId, { ...employeeData, Age: age });
  
      // Set the calculated age in the state
      this.setState(
        {
          employeeData: {
            ...employeeData,
            Age: age,
          },
          error: '', // Clear the error state when the age is valid
        },
        () => {
          // Reload the page after the component has updated
          window.location.reload();
        }
      );
  
      // Handle success (e.g., show a success message)
      console.log('Employee data updated successfully');
    } catch (error) {
      // Handle error appropriately (e.g., show an error message)
      console.error('Error updating employee data:', error);
    }
  };
  
  
  
  
  

  render() {
    const { employeeData, timeRemainingForRetirement } = this.state;

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
                          <Form.Group controlId="DateOfJoining">
                            <Form.Label>Date Of Joining value</Form.Label>
                            <Form.Control
                              type="text"
                              id="DateOfJoining"
                              name="DateOfJoining"
                              value={this.state.employeeData.DateOfJoining}
                              readOnly // To make it read-only
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={12}>
                          <Form.Group controlId="TimeForRetirement">
                            <Form.Label>Time for Retirement:</Form.Label>
                            <Form.Control
                              type="text"
                              value={timeRemainingForRetirement}
                              readOnly // To make it read-only
                            />
                          </Form.Group>
                        </Col>
                      </Row>


                      <Row>
                        <Col md={12}>
                          <div className="row">
                            <div className="button_wrapper">
                              <Button variant="primary" onClick={this.handleUpdate}>
                                Update Employee
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

export default EmployeeDetails;

