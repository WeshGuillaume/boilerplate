module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/ramble',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/ramble',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: {
      port: 5432,
      host: 'ec2-107-20-167-11.compute-1.amazonaws.com',
      database: 'damojim0jmj0cl',
      password:
        '10d08944274ff83b5b8a0cea3165b030a4b40e2ace7c5785296381959f1c61bb',
      user: 'rjbjdcrieymmid'
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/production'
    },
    useNullAsDefault: true
  }
}
