// graphql-queries.js
export const CREATE_EMPLOYEE_MUTATION = `
  mutation CreateEmployee($employee: EmployeeInputs!) {
    createEmployee(employee: $employee) {
      id
      FirstName
      LastName
      Age
      DateOfJoining
      Title
      Department
      EmployeeType
      CurrentStatus
      Phone
      DateOfBirth
    }
  }
`;

export const UPDATE_EMPLOYEE_MUTATION = `
  mutation UpdateEmployee($id: Int!, $changes: EmployeeUpdateInputs!) {
    updateEmployee(id: $id, changes: $changes) {
      id
      FirstName
      LastName
      Age
      DateOfJoining
      Title
      Department
      EmployeeType
      CurrentStatus
      Phone
      DateOfBirth
    }
  }
`;

export const DELETE_EMPLOYEE_MUTATION = `
  mutation DeleteEmployee($id: Int!) {
    deleteEmployee(id: $id)
  }
`;



export const GET_EMPLOYEE_BY_ID_QUERY = `
  query GetEmployeeById($id: Int!) {
    Employee(id: $id) {
      id
      FirstName
      LastName
      Age
      DateOfJoining
      Title
      Department
      EmployeeType
      CurrentStatus
      Phone
      DateOfBirth
    }
  }
`;

export const GET_EMPLOYEES_BY_FILTER_QUERY = `
  query GetEmployeesByFilter($filterType: String!) {
    EmployeeList(employeeType: $filterType) {
      id
      FirstName
      LastName
      Age
      DateOfJoining
      Title
      Department
      EmployeeType
      CurrentStatus
      Phone
      DateOfBirth
    }
  }
`;

export const GET_EMPLOYEES_BY_RETIREMENT_FILTER_QUERY = `
  query GetEmployeesByRetirementFilter($filterType: String!){
    upcomingRetirements(employeeType:$filterType){
      id 
      FirstName
      LastName
      Age
      DateOfJoining
      Title
      Department
      EmployeeType
      CurrentStatus
      Phone
      DateOfBirth
    }
  }


`;
