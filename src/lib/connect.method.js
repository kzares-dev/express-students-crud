const mongoose = require("mongoose");

async function connectToDatabase() {
  // 1. Set the environment variable for the database URL:
  const databaseURL = process.env.MONGODB_URI;

  // 2. Validate the database URL:
  if (!databaseURL) {
    console.error("Database URL is not defined. Please set the MONGODB_URI environment variable.");
    process.exit(1); // Exit the process if the URL is not defined
  }

  // 3. Connection options (optional):
  mongoose.set("strictQuery", false);// strinct query to false is mandatory
  const options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true, // Enhancements for security and stability
    autoIndex: false, // Disable automatic indexing to improve performance
  };

  // 4. Asynchronous connection:
  try {
    await mongoose.connect(databaseURL, options);
    console.log("Connected to MongoDB database.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit the process if the connection fails
  }
}

module.exports = connectToDatabase;
