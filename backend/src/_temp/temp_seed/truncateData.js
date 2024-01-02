const { Client } = require("pg");

const connectionOptions = {
  host: "127.0.0.1",
  port: 5433,
  user: "user",
  password: "pass",
  database: "thegoodcorner",
};

const client = new Client(connectionOptions);

const initializeConnection = async () => {
  try {
    await client.connect();
    console.log("Connected to the database");

    await insertData();

    await client.end(); // Don't forget to close the connection when done
    console.log("Connection closed");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

const insertData = async () => {
  try {

    await client.query(`
    TRUNCATE ad_tags_tag CASCADE
    `);
    await client.query(`
    TRUNCATE ad CASCADE
    `);
    await client.query(`
    TRUNCATE category CASCADE
    `);
    await client.query(`
    TRUNCATE tag CASCADE
    `);

    console.log("Data deleted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};

const executeScript = async () => {
  await initializeConnection();
};

executeScript();