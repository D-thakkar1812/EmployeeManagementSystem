// employee-functions.js

// Import GraphQL queries
import { CREATE_EMPLOYEE_MUTATION, UPDATE_EMPLOYEE_MUTATION, DELETE_EMPLOYEE_MUTATION, GET_EMPLOYEE_BY_ID_QUERY, GET_EMPLOYEES_BY_FILTER_QUERY, GET_EMPLOYEES_BY_RETIREMENT_FILTER_QUERY } from './graphQLQueries';

const jsonDateReviver = (key, value) => {
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)) {
    return new Date(value);
  }
  return value;
};

export const createEmployee = async (employee) => {
  // Use the imported GraphQL query
  try {
    const response = await fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: CREATE_EMPLOYEE_MUTATION, variables: { employee } }),
    });

    if (response.ok) {
      await response.json();
      alert("Employee added successfully!");
      return true;
    }
    return false;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const updateEmployee = async (id, changes) => {
  // Use the imported GraphQL query and fix the variable usage
  try {
    const response = await fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: UPDATE_EMPLOYEE_MUTATION, variables: { id, changes } }),
    });

    if (response.ok) {
      await response.json();
      alert("Employee Updated successfully!");
      return true;
    }
    return false;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};



export const deleteEmployee = async (id) => {
  try {
    const response = await fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: DELETE_EMPLOYEE_MUTATION, variables: { id } }),
    });

    if (response.ok) {
      const responseData = await response.json();

      if (responseData.errors) {
        console.error("GraphQL errors:", responseData.errors);
        alert("Failed to delete employee. GraphQL errors occurred.");
      } else {
        const success = responseData.data.deleteEmployee;

        if (success) {
          // Employee deleted successfully
          alert("Employee deleted successfully. Hurray");
        } else {
          // Display the error message
          alert("Failed to delete employee. The current status is 'Working'.");
        }
      }
    } else {
      console.error("Network response was not ok:", response.status, response.statusText);
      alert("Failed to delete employee. Network response was not OK.");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Failed to delete employee. An error occurred.");
    throw error;
  }
};



export const getEmployeeById = async (id) => {
  // Use the imported GraphQL query and fix the variable usage
  try {
    const response = await fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: GET_EMPLOYEE_BY_ID_QUERY,
        variables: { id },
      }),
    });

    if (response.ok) {
      const body = JSON.parse(await response.text(), jsonDateReviver);
      return body.data.Employee;
    }
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const getEmployeesByFilter = async (filterType) => {
  try {
    
    const response = await fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: GET_EMPLOYEES_BY_FILTER_QUERY,
        variables: { filterType },
      }),
    });

    if (response.ok) {
      const body = JSON.parse(await response.text(), jsonDateReviver);

      // Check if 'EmployeeList' exists in the response
      if (body && body.data && body.data.EmployeeList) {
        return body.data.EmployeeList;
      } else {
        // Handle the case where 'EmployeeList' is null or undefined
        console.error('EmployeeList is null or undefined in the response');
        return []; // Or handle this case in a way that makes sense for your application
      }
    }
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const getEmployeesByFilterRetirement = async (filterType) => {
  try{
      alert(filterType);
      const response = await fetch("http://localhost:3000/graphql",{
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({
          query:GET_EMPLOYEES_BY_RETIREMENT_FILTER_QUERY,
          variables: {filterType},
        }),
      });

      if(response.ok){
        const body = JSON.parse(await response.text(), jsonDateReviver);
        if(body && body.data && body.data.upcomingRetirements){
            return body.data.upcomingRetirements;
        }else{
          console.error('Upcoming Retirement list is empty');
          return [];
        }
      }
  }
  catch(error){
    console.error('Fetch error:',error);
    throw error;
  }
}

export const getAge = (DateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(DateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  let month = today.getMonth() - birthDate.getMonth();
  if(month<0 || (month===0 && today.getDate()<birthDate.getDate())){
    age--;
  }

  return age;
}