/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('raw_materials_expense', (table) => {
  table.increments('id').primary();
  table.string('name').notNull();
  table.integer('quantity').notNull();
  table.string('user_updater').notNull();
  table.timestamp('created_date').defaultTo(knex.fn.now());
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('raw_materials_expense');
