#! /usr/bin/env node
import { log } from "mercedlogger";
import { execSync } from "child_process";
import scaffold from "./scaffold.js";

const [, , operation, arg1] = process.argv;

switch (operation) {
  case "newbasicproject":
    log.cyan("Process", "Generating New CoquitoJS Project");
    execSync(`npx degit@latest AlexMercedCoder/CoquitoJS-Template ${arg1}`);
    log.cyan(
      "Process",
      `Project generated, cd into ${
        arg1 ? arg1 : "my-app"
      } folder and run npm install`
    );
    break;

  case "scaffold":
      arg1 ? scaffold(arg1) : scaffold()
    break;

  case "generate":
    break;

  default:
    console.log(`
        -----------------------------------------------------------
                        No Operation Specified
            OPTIONS:
            - newbasicproject [projectname] (create new coquito app from basic template)
            - scaffold [path to scaffold.json]
            - generate [item to generate] [name]
        -----------------------------------------------------------
        `);
}
