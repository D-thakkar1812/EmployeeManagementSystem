const { UserInputError } = require('apollo-server-express');
const { getDb,getEmployeeDbInstance } = require('./db.js');


//for generating employee id randomly
function generateEmployeeID() {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//for getting particular collection
const getCollection = async (collectionName) => {
    const db = getDb();
    return db.collection(collectionName);
};

const getEmployeesCollection = () => getCollection('employees');


//for getting employeeList
const employeeList = async (_, { employeeType }) => {
    const employeeInstance = await getEmployeeDbInstance();
    const filter = employeeType ? { EmployeeType: employeeType } : {};
    const employees = await employeeInstance.find(filter).toArray();
    return employees;
};



const getEmployee = async (_, { id }) => {
    const Employee= await getEmployeeDbInstance().findOne({ id });
    
    return Employee;
};


//function is constructed for validating input fields
const validateEmployee = ({ FirstName, LastName, Age, Department, Phone, Title }) => {
    const errors = [];

    if (FirstName.length < 3) {
        errors.push('Field "FirstName" must be at least 3 characters long.');
    }
    if (LastName.length < 3) {
        errors.push('Field "LastName" must be at least 3 characters long.');
    }
    if (Age < 18 || Age > 90) {
        errors.push('Field "Age" must be in Range of 18 to 90.');
    }
    if (Department.length <= 0) {
        errors.push('Field "Department" must be selected.');
    }
    if (Phone.length < 10) {
        errors.push('Field "Phone" must be at least 10 characters long.');
    }
    if (Title.length <= 0) {
        errors.push('Field "Title" must be selected.');
    }
    if (errors.length > 0) {
        throw new UserInputError('Invalid input(s)', { errors });
    }
};


//creating new employee object and adding it to collection

const employeeAdd = async (_, { employee }) => {
    
    // validateEmployee(employee);
    employee.id = generateEmployeeID();
    const result = await getEmployeeDbInstance().insertOne(employee);
    const newEmployee = await getEmployeeDbInstance().findOne({ _id: result.insertedId });
    return newEmployee;
};



//for updating an employee

const updateEmployee = async (_, { id, changes }) => {
    
    if (Object.keys(changes).some(key => [' FirstName', ' LastName', ' Age', ' Title', 'Department', 'Phone', 'CurrentStatus', 'EmployeeType','DateOfJoining'].includes(key))) {
        const employee = await getEmployeeDbInstance().findOne({ id });
        console.log('these changes should be applied',JSON.stringify(changes));
        Object.assign(employee, changes);
        validateEmployee(employee);
    }

    await getEmployeeDbInstance().updateOne({ id }, { $set: changes });
    const savedEmployee = await getEmployeeDbInstance().findOne({ id });
    return savedEmployee;
};



const removeEmployee = async (_, { id }) => {
    const employeeDb = getEmployeeDbInstance();
    
    // Fetch the employee by ID
    const employee = await employeeDb.findOne({ id });

    // Check if the employee exists
    if (!employee) {
        return false; // Employee not found
    }

    // Check if the employee's current status is "Working"
    if (employee.CurrentStatus === "Working") {
        return false; // Cannot delete employee because the current status is 'Working'.
    }

    // If the employee is not working, proceed with deletion
    const deleteResult = await employeeDb.deleteOne({ id });

    return deleteResult.deletedCount === 1; // Return a boolean directly
};

const getUpcomingRetirements = async () => {
    const today = new Date();
    const sixMonthsFromNow = new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());

    const employees = await getEmployeeDbInstance().find().toArray(); // Fetch all employees
    
    if (employees) {
        const upcomingRetirements = employees.filter((employee) => {
            const retirementAge = 65; // Assuming retirement age is 65

            // Calculate retirement date based on DateOfBirth
            const retirementDate = new Date(employee.DateOfBirth);
            retirementDate.setFullYear(retirementDate.getFullYear() + retirementAge);

            return retirementDate <= sixMonthsFromNow;
        });

        return upcomingRetirements;
    }
};


const getUpcomingRetirementsFiltered = async (_, { employeeType }) => {
    try {
    
    
      const upcomingRetirements = await getUpcomingRetirements();
      console.log("Coming in filter function and employee type is",employeeType);
      
  
      if (employeeType) {
        return upcomingRetirements.filter((employee) => employee.EmployeeType === employeeType);
      }
  
      return upcomingRetirements;
    } catch (error) {
      console.error('Error in getUpcomingRetirementsFiltered:', error);
      throw error;
    }
  };
  
  
  



module.exports = { employeeList, employeeAdd, getEmployee, updateEmployee,  removeEmployee, getUpcomingRetirementsFiltered };
