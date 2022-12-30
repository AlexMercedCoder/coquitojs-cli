import { execSync } from "child_process";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "fs";
import { log } from "mercedlogger";

export default function scaffold(pathToJson = "./scaffold.json") {
  //+++++++++++++++++++++++++++++++++++
  //++++++Check If File Exists
  //+++++++++++++++++++++++++++++++++++

  // check if file exists
  if (!existsSync(pathToJson)) {
    throw `scaffold.json at path (${pathToJson}) does not exist`;
  }

  //+++++++++++++++++++++++++++++++++++
  //++++++Track Deps
  //+++++++++++++++++++++++++++++++++++

  // track dependencies
  const dependencies = ["coquito", "cors", "dotenv"];
  const serverImports = [
    'import CoquitoApp from "coquito";',
    'import cors from "cors";',
    'import corsOptions from "./cors.js";',
    'import dotenv from "dotenv";',
    'import serverConfig from "./server-config.json" assert { type: "json" };',
  ];

  // default root route
  let rootRoute =
    "app.app.get('/', (req, res) => {res.send('server working`)})";
  let viewConfigure = undefined;

  //+++++++++++++++++++++++++++++++++++
  //++++++Read Scaffold.json
  //+++++++++++++++++++++++++++++++++++

  log.white("Progress", "Read scaffolding json");
  // read scaffold.json
  const configRaw = readFileSync(pathToJson);
  const config = JSON.parse(configRaw);

  //+++++++++++++++++++++++++++++++++++
  //++++++ Create Directories
  //+++++++++++++++++++++++++++++++++++

  log.white("Progress", "Create Directories");
  // create folders
  mkdirSync("./controllers");
  config.static ? mkdirSync(config.static) : null;
  config.views ? mkdirSync("./views") : null;
  mkdirSync("./models");

  //+++++++++++++++++++++++++++++++++++
  //++++++ write server-config.json
  //+++++++++++++++++++++++++++++++++++

  log.white("Progress", "Write server-config.json");
  //config object -> server-config.json
  const { bodyparsers, routers, graphql, rpc, port, host, views } = config;

  writeFileSync(
    "./server-config.json",
    `
    {
        "bodyparsers": ${Boolean(bodyparsers)},
        "routers": ${JSON.stringify(routers)},
        "port": ${port ? port : 4000},
        ${config.static ? `"static": "${config.static}",` : ""}
        "host": ${host ? `"${host}"` : '"localhost"'}
    }
    `
  );

  //+++++++++++++++++++++++++++++++++++
  //++++++ Scaffold GraphQL
  //+++++++++++++++++++++++++++++++++++

  log.white("Progress", "GraphQL Scaffolding (if graphql: true)");
  // setting up graphql
  if (graphql) {
    mkdirSync("./graphql");
    writeFileSync(
      "./graphql/rootValue.js",
      `// sample data
    const todos = [{message: "Breakfast"}]

const rootValue = {
    // Resolver for getTodos query
    getTodos: () => todos,
    // Resolver for createTodo mutation
    createTodo: (args) => {
      const message = args.message;
      todos.push({ message });
      return "success";
    },
  };
  
  export default rootValue;
    `
    );
    writeFileSync(
      "./graphql/schema.js",
      `
    export default \`
type Todo {
    message: String
}
type Query {
  getTodos: [Todo] 
}
type Mutation {
  createTodo(message: String): String
}
\`;
    `
    );

    serverImports.push('import rootValue from "./graphql/rootValue.js";');
    serverImports.push('import schema from "./graphql/schema.js";');
  }

  //+++++++++++++++++++++++++++++++++++
  //++++++ RPC Scaffolding
  //+++++++++++++++++++++++++++++++++++

  log.white("Progress", "SimpleRPC Scaffolding (if rpc: true)");
  if (rpc) {
    mkdirSync("./rpc");
    writeFileSync(
      "./rpc/actions.js",
      `
    const actions = {
        getList: (payload, context) => {
            console.log(context)
            return [1,2,3,4,5]
        },
    
        addToList: (payload, context) => {
            console.log(context)
            return [1,2,3,4,5, payload.num]
        }
    }
    
    export default actions`
    );
    writeFileSync(
      "./rpc/context.js",
      `
    const context = {}

export default context
    `
    );

    serverImports.push('import actions from "./rpc/actions.js";');
    serverImports.push('import context from "./rpc/context.js";');
  }

  //+++++++++++++++++++++++++++++++++++
  //++++++ Scaffold Views
  //+++++++++++++++++++++++++++++++++++

  log.white("Progress", "Scaffolding Views");
  if (views) {
    if (["ejs", "pug", "hbs"].includes(views)) {
      if (["ejs", "pug", "hbs"].includes(views)) {
        dependencies.push(views);
        writeFileSync(
          `./views/index.${views}`,
          "<h1>The Server is Working</h1>"
        );
        rootRoute = `
          app.app.get("/", (req, res) => {
              res.render("index.${views}")
          })
          `;
      }
    } else {
      log.red("View Engine", `${views} view engine can't be scaffolded`);
    }
  }

  //+++++++++++++++++++++++++++++++++++
  //++++++ Write Cors File
  //+++++++++++++++++++++++++++++++++++

  log.white("Progress", "Create Cors File");
  writeFileSync(
    "./cors.js",
    `
  

// whilelist of urls for when in production
const whitelist = ['http://example1.com', 'http://example2.com']
// corsOptions obect for the cors middlware, essentially blocks requests from urls not in the whitelist
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

export default corsOptions
  `
  );

  //+++++++++++++++++++++++++++++++++++
  //++++++ Create Routers
  //+++++++++++++++++++++++++++++++++++

  log.white("Progress", "Create Routers");

  let routeRegisters = [];

  for (let router of routers) {
    const path = router.split("/")[1];
    writeFileSync(
      `./controllers/${path}.js`,
      `
    export default function ${path}Router(router){

        router.get("/", (req, res) => {
            res.send("This is the main /${path} route")
        })
    }
    `
    );
    routeRegisters.push(`
    // register /${path} routes
${path}Router(app.${path});
    `);

    serverImports.push(`import ${path}Router from "./controllers/${path}.js";`);
  }

  //+++++++++++++++++++++++++++++++++++
  //++++++ Write Server.js
  //+++++++++++++++++++++++++++++++++++

  log.white("Progress", "Building out Server.js");
  writeFileSync(
    "./server.js",
    `${serverImports.join("\n")}

  // bring in .env variables
  dotenv.config()

  // if production, use cors options, if not, allow all requests for development
const corsMiddleware =
  process.env.NODE_ENV === "production" ? cors(corsOptions) : cors();

  // use pre-hook for any configurations of app objects to occur before middleware/routers
const prehook = ${viewConfigure ? viewConfigure : "(app) => {}"}

// create application
const app = new CoquitoApp({
 ...serverConfig,
  // register other middleware for cors
  middleware: [corsMiddleware],
  ${
    graphql
      ? `
  // scaffold graphql api
  graphql: { rootValue, schema },
  `
      : ""
  }
  ${
    rpc
      ? `
  // scaffold simpleRPC api
  rpc: { actions, context },
  `
      : ""
  }
  // pass prehook for custom app configuations
  prehook,
});

// register the root route
${rootRoute}

${routeRegisters.join("\n")}

// Start Server Listener
app.listen();

  `
  );

  //+++++++++++++++++++++++++++++++++++
  //++++++ Generate Node Project
  //+++++++++++++++++++++++++++++++++++

  log.white("Progress", "Create Node Project");
  execSync("npm init -y");
  execSync(`npm install ${dependencies.join(" ")}`);

  log.green("SUCCESS", "Project is Scaffolded");
}
