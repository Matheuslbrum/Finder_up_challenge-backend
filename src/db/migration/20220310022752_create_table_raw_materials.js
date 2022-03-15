/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { onUpdateTrigger } = require('../../../knexfile');

exports.up = (knex) => knex.schema.createTable('raw_materials', (table) => {
  table.increments('id').primary();
  table.string('name').notNull();
  table.integer('quantity').notNull();
  table.string('user').notNull();
  table.string('updater');
  table.integer('current_withdrawn');
  table.integer('somed_withdrawn');
  table.timestamp('create_at').defaultTo(knex.fn.now());
}).then(() => knex.raw(onUpdateTrigger('raw_materials')));

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('raw_materials');
