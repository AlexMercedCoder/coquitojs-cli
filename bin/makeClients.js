import { execSync } from "child_process";
import { mkdirSync, writeFileSync, existsSync, write } from "fs";
import { log } from "mercedlogger";

export default function makeClients(config) {
  let graphQLClient = "";
  let rpcClient = "";

  if (config.graphql) {
    graphQLClient = `// client for graphql calls
    const gqlClient = async (query, headers = {}) => {
        const response = await fetch(url + "/graphql", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                ...headers
            },
            body: JSON.stringify({query})
        })
    
        return await response.json()
        
    }`;
  }

  if (config.rpc) {
    rpcClient = `function createClient(config){
        if (!config){
            throw "ERROR**** No Config object passed"
        }
    
        if (!config.url){
            throw "ERROR**** config object does not have url property"
        }
    
        return async (action) => {
            if (!action.type){
                throw "ERROR**** action does not have type property"
            }
    
            const type = action.type
            const payload = action.payload || {}
            const headers = config.headers || {}
            const body = JSON.stringify({type, payload})
    
            const response = await fetch(config.url, {
                method: "post",
                headers: {
                    "content-type": "application/json",
                    ...headers
                },
                body
            })
    
            return await response.json()
        }
        
    }

// client for RPC Calls
const rpcDispatch = createClient({url:url + "/rpc"})`;
  }
  if (config.rpc || config.graphql) {
    log.white("Progress", "Write graphql/rpc clients in static folder");
    writeFileSync(
      `./${config.static}/clients.js`,
      `//////////////////////
/// Frontend Clients
///////////////////////////////////
// This file has clients to use in your frontend code if using templating.
// include the file with a script tag like so
// <script src="/clients.js" defer></script>
// GraphQL Client => gqlClient(query, headers)
// RPC Client => rpcDispatch({type, payload})
// Make sure to configure url variables below
//++++++++++++++++++++++++++++++
const inProduction = false
const productionURL = undefined
const url = inProduction ? productionURL : "http://localhost:${
    config.port ? config.port : "4000"
  }"
  
//++++++++++++++++++++++++++++++
${graphQLClient}
  
//++++++++++++++++++++++++++++++
${rpcClient}
`
    );
  }
}
