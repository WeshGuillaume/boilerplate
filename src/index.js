const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const graphql = require('./middlewares/graphql')
const graphiqlExpress = require('graphql-server-express').graphiqlExpress

const PORT = process.env.PORT || 3001

const corsOptions = {
  origin: [new RegExp('http://localhost:.*')],
  credentials: true,
  preflightContinue: false
}

const server = express().use('*', cors(corsOptions))
server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

graphql(server)

server.listen(PORT, () => {
  console.log(`GraphQL Server listening on port ${PORT}`)
})
