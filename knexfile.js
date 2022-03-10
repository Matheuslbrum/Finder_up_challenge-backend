// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: "postgres",
      user: "postgres",
      password: "@Fliston007"
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/db/migration`
    }
  }
};
