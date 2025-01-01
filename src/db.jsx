const oracledb = require('oracledb');

// Database configuration
const config = {
  user: 'abdelilah',
  password: 'oracle',
  connectString: 'dbtools-dev.oraclecorp.com:2213/DB213P'
};

// Fetch data function
const fetchData = async (query) => {
  let connection;

  try {
    // Establish connection
    connection = await oracledb.getConnection(config);
    console.log('Connected to the database');

    // Execute query
    const result = await connection.execute(query);
    console.log('Query executed successfully');

    return result.rows; // Return fetched rows
  } catch (err) {
    console.error('Error connecting to the database:', err);
    throw err;
  } finally {
    // Close connection
    if (connection) {
      try {
        await connection.close();
        console.log('Connection closed');
      } catch (err) {
        console.error('Error closing the connection:', err);
      }
    }
  }
};

module.exports = fetchData;
