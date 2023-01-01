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
    "graphql": false,
    "rpc": false,
    "routers": [],
    "models" : ["Dog", "Cat"]
    "bodyparsers": false,
    "views": "hamlet",
    "port": 4444,
    "host": "0.0.0.0",
    "static": false,
    "package": {
        "name":"my-app",
        "description": "this is my-app",
        "author": "Alex Merced",
        "email": "alexmerced@alexmerced.dev",
        "repo": "http://github.com/..."
    },
    "db": "sql-sqlite3",
    "auth": "sql",
    "logging": true,
    "methodOverride": true
}
```

Then run the command

`coquito scaffold`

You project will be scaffolded in the directory. If the config file is somewhere else or under a different name can specify location like this:

`coquito scaffold ./scaffold/config.json`

- Supported View Engines ["ejs", "pug", "hbs", "liquid", "nunjucks", "mustache","twig","hamlet"]

- If you don't need a view engine, just assign false or don't include the property

- values for auth can be "sql" or "mongo", all other values will be ignored an no auth will be added.

- "methodOverride" property will let you override method on form requests by adding a url query in the formal of `?_method=DELETE` in the form action attribute.

- "logging" will add the morgan logging middleware.

- "routers" will add just a blank controller for each endpoint, "models" will create a model file, rest routes and a router for each model specified.

- If you have a static folder and graphql or rpc turned on a "clients.js" will be created that provides some basic frontend GraphQL and SimpleRPC clients to use in your frontend code.

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

## add-auth

These commands will do the following to speed up implementing auth:
- Generate a User Model
- install bcryptjs, express-session and jsonwebtoken
- create ./auth/functions.js which will have several functions that you can use to compose JWT to session based auth in your Rest/RPC/Graphql APIs

`add-auth-mongo`

`add-auth-sql`