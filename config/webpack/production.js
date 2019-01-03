process.env.NODE_ENV = process.env.NODE_ENV || "production"

// We need to compile both our production JS (for serving to the client) and our server JS
// (for SSR of React components). This is easy enough as we can export arrays of webpack configs.
const environment = require("./environment")
const serverConfig = require("./server")

module.exports = [environment.toWebpackConfig(), serverConfig]
