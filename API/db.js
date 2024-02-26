// Load environment variables from .env file
require('dotenv').config();

// MongoDB related imports
const { MongoClient } = require('mongodb');

// Declare a variable to hold the database connection
let db;

/**
 * Connect to the MongoDB database.
 * If the connection does not exist, create a new one.
 */
const connectToDb = async () => {
  // Use the DB_URL from environment variables
  const url = process.env.DB_URL;

  // Create a new MongoDB client
  const client = new MongoClient(url, { useNewUrlParser: true });

  // Connect to the MongoDB server
  await client.connect();
  console.log('Connected to MongoDB at', url);

  // Set the global variable to the connected database
  db = client.db();
};

/**
 * Get the MongoDB database instance.
 
 */
const getDb = () => {
  return db;
};

/**
 * Get the MongoDB collection instance for employees.
 * If the connection does not exist, connect first.
 *  The MongoDB collection instance for employees.
 */
// const getEmployeeDbInstance = async () => {
//   // Check if the connection already exists
//   if (!db) {
//     // If not, connect to the database
//     await connectToDb();
//   }

//   // Return the MongoDB collection instance for employees
//   return db.collection('employees');
// };

const getEmployeeDbInstance = () => {
  const db = getDb(); // Assuming getDb() returns the MongoDB database instance
  return db.collection('employees');
};

// Export the combined functionality
module.exports = { connectToDb, getDb, getEmployeeDbInstance };
