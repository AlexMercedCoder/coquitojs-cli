import { execSync } from "child_process";
import {
  mkdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  writeSync,
} from "fs";
import { log } from "mercedlogger";

export default function addMongo() {
  log.white("Progress", "Make db folder if doesn't exist");
  if (!existsSync("./db")) {
    mkdirSync("./db");
  }

  log.white("Progress", "install mongoose");
  execSync("npm install mongoose");

  log.white("Progress", "Write Connection File");
  writeSync(
    "./db/connection.js",
    `
import dotenv from "dotenv" // get .env vars
import mongoose from "mongoose" // imports mongoose

// Establish connection, DATABASE_URL defined in .env
mongoose.connect(process.env.DATABASE_URL)

// Connection Events
mongoose.connection
.on("open", () => {console.log("Connected to Mongo")})
.on("close", () => {console.log("Disconnected from Mongo")})
.on("error", (error) => {console.log(error)})

// export the mongoose object
export default mongoose
    `
  );
}
