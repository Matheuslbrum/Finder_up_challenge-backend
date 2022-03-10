/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => knex.schema.createTable('raw_materials', (table) =>{
    table.increments("id").primary();
    table.string("name").notNull();
    table.integer("quantity").notNull();
    table.string("user").notNull();
    table.timestamp('create_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  });


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable('raw_materials')
