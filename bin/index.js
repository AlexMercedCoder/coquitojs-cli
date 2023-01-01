#! /usr/bin/env node
import { log } from "mercedlogger";
import { execSync } from "child_process";
import scaffold from "./scaffold.js";
import addMongo from "./addmongo.js";
import addMongoModel from "./addmongomodel.js";
import addRestRoutes from "./addrestroutes.js";
import addSQL from "./addsql.js";
import addSQLModel from "./addsqlmodel.js";
import authMongo from "./authmongo.js";
import authSQL from "./authsql.js";

const [, , operation, arg1] = process.argv;

switch (operation) {
  case "newbasicproject":
    log.cyan("Process", "Generating New CoquitoJS Project from Basic JS Template");
    execSync(`npx degit@latest AlexMercedCoder/CoquitoJS-Template ${arg1}`);
    log.cyan(
      "Process",
      `Project generated, cd into ${
        arg1 ? arg1 : "my-app"
      } folder and run npm install`
    );
    break;

  case "newtsproject":
      log.cyan("Process", "Generating New CoquitoJS Project from TS Template");
      execSync(`npx degit@latest AlexMercedCoder/Coquito-TS-Template ${arg1}`);
      log.cyan(
        "Process",
        `Project generated, cd into ${
          arg1 ? arg1 : "my-app"
        } folder and run npm install`
      );
      break;

  case "scaffold":
    arg1 ? scaffold(arg1) : scaffold();
    break;

  case "generate":
    break;

  case "add-mongo":
    addMongo();
    break;

  case "add-rest-routes":
    arg1 ? addRestRoutes(arg1) : addRestRoutes();
    break;

  case "add-mongo-model":
    arg1 ? addMongoModel(arg1) : addMongoModel();
    break;

  case "add-sql":
    arg1 ? addSQL(arg1) : addSQL();
    break;

  case "add-sql-model":
    arg1 ? addSQLModel(arg1) : addSQLModel();
    break;

  case "add-auth-mongo":
    authMongo();
    break;

  case "add-auth-sql":
    authSQL();
    break;

  default:
    console.log(`
        -----------------------------------------------------------
                        No Operation Specified
            OPTIONS:
            - newbasicproject [projectname] (create new coquito app from basic template)
            - newtsproject [projectname] (create new coquito app from TS template)
            - scaffold [path to scaffold.json]
            - add-mongo
            - add-mongo-model [model name]
            - add-sql [db type]
            - add-sql-model [model name]
            - add-auth-mongo
            - add-auth-sql
        -----------------------------------------------------------
        `);
}
