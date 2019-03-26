const knex = require('../knex')

const id = e => e

function find(tableName, { orderBy = 'created_at', direction = 'desc' } = {}) {
  return clean => async filters => {
    try {
      const result = await (filters
        ? knex(tableName)
            .select('*')
            .orderBy(orderBy, direction)
            .where(filters)
        : knex(tableName).orderBy(orderBy, direction).select('*'))
      return result.map(clean || id)
    } catch (e) {
      console.log(e)
      return []
    }
  }
}

function findBy(tableName) {
  return (filter, clean = id) => async f => {
    try {
      const result = await knex(tableName)
        .select('*')
        .where({ [filter]: f })
      return clean(result[0])
    } catch (e) {
      return null
    }
  }
}

function del(tableName) {
  return () => async filters => {
    try {
      return knex(tableName)
        .where(filters)
        .del()
    } catch (e) {
      return null
    }
  }
}

function delId(tableName) {
  return () => async id => {
    try {
      return knex(tableName)
        .where({ id })
        .del()
    } catch (e) {
      return null
    }
  }
}

function createMany(tableName) {
  return (validation = id) => async data => {
    data.forEach(validation)
    return knex(tableName).insert(data)
  }
}

function create(tableName) {
  return (validation = id) => async data => {
    validation(data)
    return (await knex(tableName)
      .insert(data)
      .returning('*'))[0]
  }
}

function update(tableName) {
  return () => async ({ id, ...data }) => {
    if (!id) {
      throw new Error('No id found for update')
    }
    return (await knex(tableName)
      .where({ id })
      .update(data)
      .returning('*'))[0]
  }
}

function upsert(tableName) {
  return validation => data => {}
}

module.exports = function(tableName) {
  return {
    find: find(tableName),
    findBy: findBy(tableName),
    create: create(tableName),
    createMany: createMany(tableName),
    update: update(tableName),
    upsert: upsert(tableName),
    delId: delId(tableName),
    del: del(tableName),
  }
}
