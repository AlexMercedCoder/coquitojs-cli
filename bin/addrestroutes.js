import { writeFileSync, existsSync } from "fs";
import { log } from "mercedlogger";

export default function addRestRoutes(name = "model") {
  log.white("progress", "write controllers file");
  writeFileSync(
    `./controllers/${name.toLowerCase()}.js`,
    `
    /////////////////////////////////////
    // ${name.toLowerCase()} Rest Router Wrapper
    ////////////////////////////////////
    // Make sure to pass the desired router to this function
    // for example if you have a router for "/${name.toLowerCase()}" then in server.js you'd write
    // ${name.toLowerCase()}RestRoutes(app.${name.toLowerCase()})
    
    export default function ${name.toLowerCase()}RestRoutes(router){
        
        //********************* */
        // THE INDEX ROUTE
        // get to /${name.toLowerCase()}
        // should return all items
        //********************* */
        router.get("/", async (req, res) => {
            res.json({response: "all the items"})
        })
    
        //********************* */
        // THE SHOW ROUTE
        // get to /${name.toLowerCase()}/:id
        // should return all items
        //********************* */
        router.get("/:id", async (req, res) => {
            const id = req.params.id
            res.json({response: "a single item"})
        })
    
        //********************* */
        // THE CREATE ROUTE
        // post to /${name.toLowerCase()}
        // should create a new item from request body
        //********************* */
        router.post("/", async (req, res) => {
            const body = req.body
            res.json({response: "a new item"})
        })
    
        //********************* */
        // THE UPDATE ROUTE
        // put to /${name.toLowerCase()}/:id
        // should update a particular item from request body
        //********************* */
        router.put("/:id", async (req, res) => {
            const id = req.params.id
            const body = req.body
            res.json({response: "a new item"})
        })
    
        //********************* */
        // THE DELETE ROUTE
        // delete to /${name.toLowerCase()}/:id
        // should delete the item with the specifed id
        //********************* */
        router.put("/:id", async (req, res) => {
            const id = req.params.id
            res.json({response: "a new item"})
        })
    }
    
    `
  );

  log.green("complete",`
  -------------------------------------------------------
                        COMPLETE
        - Register the routes with a router in server.js
        - Read comments in the new file in ./controllers/${name.toLowerCase()}.js
  -------------------------------------------------------
  `)
}
