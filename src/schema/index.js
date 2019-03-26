const glob = require('glob')
const fs = require('fs')
const { buildSchema } = require('graphql')

const schema = glob
  .sync('**/*.graphql', { absolute: true })
  .map(f => fs.readFileSync(f, 'utf8'))
  .join('\n')

module.exports = schema
