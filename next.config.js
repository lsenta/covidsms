const dotEnvResult = require('dotenv').config()

const parsedVariables = dotEnvResult.parsed || {}
const dotEnvVariables = {}

// We always want to use the values from process.env, since dotenv
// has already resolved these correctly in case of overrides
for (const key of Object.keys(parsedVariables)) {
  dotEnvVariables[key] = process.env[key]
}

module.exports = (phase, { defaultConfig }) => {
  return {
    experimental: {
      jsconfigPaths: true, // https://github.com/zeit/next.js/pull/11293
    },
    env: {
      ...dotEnvVariables
    }
  }
}
