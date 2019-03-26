const service = require('./base')
const knex = require('../knex')

const db = service('users')

const find = db.find()
const findById = db.findBy('id')

module.exports = {
  find,
  findById
}
