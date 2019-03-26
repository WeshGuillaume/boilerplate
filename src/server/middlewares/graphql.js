const { graphqlConnect, ApolloServer } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('../resolvers')
const cors = require('cors')
const users = require('../services/users')

const corsOptions = {
  origin: [new RegExp('http://localhost:.*')],
  credentials: true,
  preflightContinue: false
}

const typeDefs = require('../schema')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    async getCurrentUser() {
      const token = req.headers.authorization
      if (!token) {
        return null
      }
      const user = await users.getFromToken(token)
      return user
    }
  })
})

module.exports = app => server.applyMiddleware({ app })
