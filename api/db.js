const {MongoClient} = require('mongodb');
require('dotenv').config()
// Replace the following with your MongoDB connection string.
// 49.43.169.1)
const uri = process.env.DB_URL;

// Replace 'test' with your actual database name.
const dbName = process.env.DB_NAME;

const options = {

  maxPoolSize: 10, // Adjust the pool size as needed
};

// Function to connect to the database
async function connectToDatabase() {
  const client = new MongoClient(uri, options);
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    console.log('Connected to MongoDB');
    
    // Specify the database to be used
    const db = client.db(dbName);
    // Return the database connection
    return db;
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    throw err;
  }
}

// Export the connection function
module.exports= {connectToDatabase };