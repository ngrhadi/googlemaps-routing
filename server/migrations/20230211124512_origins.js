
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  return await knex.schema.dropTableIfExists('origins').withSchema('public')
    .then(function () {
      return knex.schema.createTable('origins', function (table) {
        table.increments('id').primary();
        table.point('location')
        table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
        table.timestamp('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
      });
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  try {
    await knex.schema.withSchema("public").dropTableIfExists("origins");
    return true;
  } catch (error) {
    return false;
  }
};
