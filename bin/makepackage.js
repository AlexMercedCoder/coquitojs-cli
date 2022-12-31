import { execSync } from "child_process";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "fs";
import { log } from "mercedlogger";

// takes the config.package property from scaffold.json

export default function makePackage(pack) {
  if (!pack) {
    writeFileSync(
      "./package.json",
      `{
            "name": "",
            "version": "1.0.0",
            "description": "",
            "main": "server.js",
            "type": "module",
            "license": "AGPL-version-3.0",
            "private": false,
            "engines": {
              "node": ">= 18.0.0",
              "npm": ">= 8.0.0"
            },
            "homepage": "",
            "repository": {
              "type": "git",
              "url": ""
            },
            "bugs": "",
            "keywords": [],
            "author": {
              "name": "",
              "email": "",
              "url": ""
            },
            "contributors": [
          
            ],
            "scripts": {
              "start":"node server.js",
              "dev": "node --watch server.js"
            },
            "dependencies": {
          
            },
            "devDependencies": {
          
            }
          }`
    );
    return "done";
  }

  writeFileSync(
    "./package.json",
    `{
        "name": "${pack.name ? pack.name : ""}",
        "version": "1.0.0",
        "description": "${pack.description ? pack.description : ""}",
        "main": "server.js",
        "type": "module",
        "license": "AGPL-version-3.0",
        "private": false,
        "engines": {
          "node": ">= 18.0.0",
          "npm": ">= 8.0.0"
        },
        "homepage": "",
        "repository": {
          "type": "git",
          "url": ""
        },
        "bugs": "",
        "keywords": [],
        "author": {
          "name": "",
          "email": "",
          "url": ""
        },
        "contributors": [
      
        ],
        "scripts": {
          "start":"node server.js",
          "dev": "node --watch server.js"
        },
        "dependencies": {
      
        },
        "devDependencies": {
      
        }
      }`
  );
}
