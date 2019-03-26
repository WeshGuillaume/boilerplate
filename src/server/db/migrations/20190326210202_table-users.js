exports.up = function(knex) {
  return knex.schema.createTable('users', t => {
    t.increments('id').primary()
    t.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('users')
}
