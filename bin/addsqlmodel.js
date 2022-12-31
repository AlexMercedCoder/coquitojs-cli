import {
    mkdirSync,
    writeFileSync,
    existsSync,
  } from "fs";
  import { log } from "mercedlogger";
  
  export default function addSQLModel(modelName = "Model") {
  
    log.white("Progress", "Checking for Models File");
    if (!existsSync("./models")) {
          mkdirSync("./models");
        }
  
    log.white("Progress", "Write Model File");
    writeFileSync(
      `./models/${modelName}.js`,
      `import { DataTypes } from 'sequelize';
      import connection from "../db/connection.js"
      
      const ${modelName} = connection.define('${modelName}', {
        // Model attributes are defined here
        name: {
          type: DataTypes.STRING,
          allowNull: false
        }
      }, {
        // Other model options go here
      });
      
      ${modelName}.sync()
      
      export default ${modelName}`
    );

    log.white("Progress", "creating model controller file");
  addRestRoutes(modelName.toLowerCase());
  
    log.green("complete",`
    -------------------------------------------------------
                          COMPLETE
          - Make sure to specify the schema in ./models/${modelName}.js
          - Import the model in controllers you want to use it in
    -------------------------------------------------------
    `)
  }