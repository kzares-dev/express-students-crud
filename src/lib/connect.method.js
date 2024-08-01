const mongoose = require("mongoose");

async function connectToDatabase() {
  // 1. Set the environment variable for the database URL:
  const databaseURL = process.env.MONGODB_URI;

  // 2. Validate the database URL:
  if (!databaseURL) {
    console.error(
      "Database URL is not defined. Please set the MONGODB_URI environment variable."
    );
    process.exit(1); // Exit the process if the URL is not defined
  }

  // 3. Connection options (optional):
  mongoose.set("strictQuery", false); // strinct query to false is mandatory
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Enhancements for security and stability
    autoIndex: false, // Disable automatic indexing to improve performance
  };

  // 4. Asynchronous connection:
  try {
    mongoose.connect(databaseURL, options);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log(`Database connected`);
  });

  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });
  return;
}

module.exports = connectToDatabase;
