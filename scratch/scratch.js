import {readFileSync, writeFileSync} from "fs"

const file = readFileSync("./sample.json")

console.log(file)
console.log(JSON.parse(file))

const changes = JSON.parse(file)

changes.stuff = "bread"
changes.things = "hello"

writeFileSync("./sample-output.json", JSON.stringify(changes))