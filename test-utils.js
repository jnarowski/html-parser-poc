const fs = require("fs")
const path = require("path")

module.exports.readFixture = (fixture) =>
    fs.readFileSync(path.join(__dirname, `./fixtures/${fixture}`)).toString()