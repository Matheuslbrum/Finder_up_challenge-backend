const CUSTOM_FUNCTIONS = `
 CREATE OR REPLACE FUNCTION on_update_material()
 RETURNS trigger AS $$
 BEGIN
    INSERT INTO raw_materials_expense (user_updater, name, quantity)
    VALUES (NEW.updater, NEW.name, NEW.current_withdrawn);
    RETURN NEW;
 END;
 $$ language 'plpgsql'
 `;

const DROP_CUSTOM_FUNCTIONS = `
    DROP FUNCTION on_update_material()
`;

exports.up = async (knex) => knex.raw(CUSTOM_FUNCTIONS);
exports.down = async (knex) => knex.raw(DROP_CUSTOM_FUNCTIONS);
