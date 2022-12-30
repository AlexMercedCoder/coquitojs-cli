import { execSync } from "child_process";
import {
  mkdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  writeSync,
} from "fs";
import { log } from "mercedlogger";

export default function addMongoModel(modelName = "Model") {

  log.white("Progress", "Checking for Models File");
  if (!existsSync("./models")) {
        mkdirSync("./models");
      }

  log.white("Progress", "Write Model File");
  writeSync(
    `./models/${modelName}.js`,
    `import mongoose from "../db/connection.js";

    // ${modelName} SCHEMA - Definition/Shape of the Data Type
    const ${modelName.toLowerCase()}Schema = new mongoose.Schema({
        name: {type: String, required: true},
    }, {timestamps: true})
    
    // ${modelName} Model - Interface with the database for ${modelName}
    const ${modelName} = mongoose.model("${modelName}", ${modelName.toLowerCase()}Schema)
    
    // Export the ${modelName} Model
    export default ${modelName}`
  );
}