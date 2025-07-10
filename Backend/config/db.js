
const sql = require("mssql");
require("dotenv").config({ path: require('path').resolve(__dirname, '../../.env') }); 




const [serverName, instanceName] = process.env.DB_SERVER.split("\\");

const config = {
  server: serverName,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    instanceName: instanceName
  },
  port: parseInt(process.env.DB_PORT) || 1433
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch(err => {
    console.error("Database connection failed:", err);
    throw err;
  });

module.exports = {
  sql,
  poolPromise
};

