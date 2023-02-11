/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  return await knex.schema.dropTableIfExists('destination').withSchema('public')
    .then(function () {
      return knex.schema.createTable('destination', function (table) {
        table.uuid('id').primary();
        table.point('location')
        table.timestamp('created_at');
        table.timestamp('updated_at');
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
