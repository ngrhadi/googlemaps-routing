
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  return await knex.schema.dropTableIfExists('destinations').withSchema('public')
    .then(function () {
      return knex.schema.createTable('destinations', function (table) {
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
    await knex.schema.withSchema("public").dropTableIfExists("destination");
    return true;
  } catch (error) {
    return false;
  }
};
