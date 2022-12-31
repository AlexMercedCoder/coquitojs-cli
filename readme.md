## Coquito-CLI

[Read Documentation for Coquito Framework here](https://www.npmjs.com/package/coquito)

## Installing

`npm install -g coquito-cli`

## newbasicproject

Create a new Coquito Project from the base template with the following command.

`coquito newbasicproject`

you can also specify the folder name like so:

`coquito newbasicproject folderName`

## scaffold

create an empty directory and create a "scaffold.js" that looks like this:

```json
{
  "graphql": true,
  "rpc": true,
  "routers": ["/cheese", "/bread"],
  "bodyparsers": true,
  "views": "hbs",
  "port": 4444,
  "host": "0.0.0.0",
  "static": "public"
}
```

Then run the command

`coquito scaffold`

You project will be scaffolded in the directory. If the config file is somewhere else or under a different name can specify location like this:

`coquito scaffold ./scaffold/config.json`

- Supported View Engines ["ejs", "pug", "hbs", "liquid", "nunjucks", "mustache","twig","hamlet"]

- If you don't need a view engine, just assign false or don't include the property

## add-mongo

Scaffold connection file for using mongo

`coquito add-mongo`

## add-mongo-model

Scaffold a mongo model file.

`coquito add-mongo-model Dog`

## add-rest-routes

Add a new controller file with Index, Show, Create, Update and Delete routes scaffolding for easy CRUD route building.

`coquito add-rest-routes dog`

## add-sql

Scaffold a Sequalize connection file for connecting to sql databases. Install sequelize and libraries for specified database.

```
coquito add-sql sqlite3
```

database options

```
["pg", "mysql2", "sqlite3", "mariadb", "oracledb", "MSSQL"]
```