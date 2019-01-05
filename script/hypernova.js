// HYPERNOVA SERVER SCRIPT
// When running, Rails will automatically serve registered React components pre-rendered with Hypernova

const hypernova = require("hypernova/server")
const winston = require("winston")

const env = process.env.NODE_ENV || "development"
const devMode = env === "development"
const loggerInstance = devMode
  ? winston.createLogger({
      level: "debug",
      transports: [new winston.transports.Console()],
    })
  : winston.createLogger({
      level: "info",
      transports: [new winston.transports.File({ filename: "log/hypernova.log" })],
    })

hypernova({
  devMode,
  loggerInstance,
  getComponent: name => {
    // Allow iteration in dev, because require is cached otherwise
    if (devMode) {
      delete require.cache[require.resolve("../public/packs/server.js")]
    }

    let next = require("../public/packs/server.js")

    if (next[name]) return next[name]
    throw new Error(
      `Could not find component named ${name} in packs/hypernova-server.js, ensure you exported it with the name ${name}`
    )
  },
  port: process.env.HYPERNOVA_PORT || 3030,
})
