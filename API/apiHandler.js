const fs = require('fs');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const GraphQLDate = require('./graphQlDate.js');
const employee = require('./employee.js');

// Resolvers for GraphQL queries and mutations
const resolvers = {
    Query: {
        // Resolver for fetching the list of employees
        EmployeeList: employee.employeeList,

        // Resolver for fetching a specific employee by ID
        Employee: employee.getEmployee,

        //Resolver for filtering Employee on the basis of upcoming retirement
        upcomingRetirements : employee.getUpcomingRetirementsFiltered,
    },
    Mutation: {
        // Resolver for adding a new employee
        createEmployee: employee.employeeAdd,

        // Resolver for updating an existing employee
        updateEmployee: employee.updateEmployee,

        // Resolver for deleting an employee
        deleteEmployee: employee.removeEmployee,
    },
    // Custom scalar for handling date values
    GraphQLDate,
};

// Create an Apollo Server instance
const server = new ApolloServer({
    // Read the GraphQL schema from the file
    typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),

    // Provide the defined resolvers
    resolvers,

    // Format error function for logging errors
    formatError: error => {
        console.log(error);
        return error;
    },
});

// Function to install Apollo Server as middleware on an Express app
async function installHandler(app) {
    // Determine whether to enable CORS based on the environment variable
    const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
    console.log('CORS setting:', enableCors);
  
    // Start the Apollo Server before applying middleware
    await server.start();
  
    // Apply Apollo Server middleware to the app at the specified path
    server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
  }
  

// Export the installHandler function for use in other modules
module.exports = { installHandler };
