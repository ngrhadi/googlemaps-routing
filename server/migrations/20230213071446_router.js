
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  return await knex.schema.dropTableIfExists('googlemaps').withSchema('public')
    .then(function () {
      return knex.schema.createTable('googlemaps', function (table) {
        table.increments('id').primary();
        table.string('code', 6).primary();
        table.point('origin');
        table.point('destination');
        table.string('distance', 50);
        table.string('duration', 50);
        table.string('route', 3000);
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
    await knex.schema.withSchema("public").dropTableIfExists("googlemaps");
    return true;
  } catch (error) {
    return false;
  }
};
