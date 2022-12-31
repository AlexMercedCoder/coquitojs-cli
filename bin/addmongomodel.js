import { mkdirSync, writeFileSync, existsSync } from "fs";
import { log } from "mercedlogger";
import addRestRoutes from "./addrestroutes";

export default function addMongoModel(modelName = "Model") {
  log.white("Progress", "Checking for Models File");
  if (!existsSync("./models")) {
    mkdirSync("./models");
  }

  log.white("Progress", "Write Model File");
  writeFileSync(
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

  log.white("Progress", "creating model controller file");
  addRestRoutes(modelName.toLowerCase());

  log.green(
    "complete",
    `
  -------------------------------------------------------
                        COMPLETE
        - Make sure to specify the schema in ./models/${modelName}.js
        - Import the model in controllers you want to use it in
  -------------------------------------------------------
  `
  );
}
