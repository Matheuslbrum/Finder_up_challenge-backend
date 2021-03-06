/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('users', (table) => {
  table.increments('id').primary();
  table.string('email').unique().notNull();
  table.string('username').notNull();
  table.string('profession').notNull();
  table.timestamp('created_date').defaultTo(knex.fn.now());
});

/**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
exports.down = (knex) => knex.schema.dropTable('users');
