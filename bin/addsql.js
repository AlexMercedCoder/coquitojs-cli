import { execSync } from "child_process";
import { mkdirSync, writeFileSync, existsSync } from "fs";
import { log } from "mercedlogger";

export default function addSQL(db = "sqlite3") {
  log.white("Progress", "Make db folder if doesn't exist");
  if (!existsSync("./db")) {
    mkdirSync("./db");
  }

  log.white("Progress", "Checking if database is supported");
  if (
    !["pg", "mysql2", "sqlite3", "mariadb", "oracledb", "MSSQL"].includes(db)
  ) {
    throw `this database is not supported by sequalize, possible options are ["pg", "mysql2", "sqlite3", "mariadb", "oracledb", "MSSQL"]`;
  }

  log.white("Progress", "Downloading Database Libraries");
  execSync("npm install sequelize");
  if (db === "pg") {
    execSync("npm install pg pg-hstore");
  }
  if (db === "mysql2") {
    execSync("npm install mysql2");
  }
  if (db === "mariadb") {
    execSync("npm install mariadb");
  }
  if (db === "sqlite3") {
    execSync("npm install sqlite3");
  }
  if (db === "oracledb") {
    execSync("npm install oracledb");
  }
  if (db === "MSSQ") {
    execSync("npm install tedious");
  }

  log.white("Progress", "Write Connection File");
  writeFileSync(
    "./db/connection.js",
    `
    import {Sequelize} from "sequelize"
    import dotenv from "dotenv"
    
    // load .env variables
    dotenv.config()
    
    // establish connection
    // Define DATABASE_URL in .env
    const connection = new Sequelize(process.env.DATABASE_URL)
    
    try {
        await connection.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    
    export default connection
    `
  );

  log.white("Progress", "Write Seed File");
  writeFileSync("./db/seed.js",`//+++++++++++++++++++++
  // Use this file to seed your database
  // import your models, create some items
  // run this file with "npm run seed"
  //++++++++++++++++++++++++++++++++++++`)

  log.green(
    "complete",
    `
  -------------------------------------------------------
                        COMPLETE
        - Create a new model with "coquito add-sql-model modelname"
        - Make sure to define DATABASE_URL in a .env file
  -------------------------------------------------------
  `
  );
}
