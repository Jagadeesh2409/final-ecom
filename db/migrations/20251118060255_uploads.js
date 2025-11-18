
exports.up = function(knex) {
    return knex.schema.createTable('uploads',(table)=>{
        table.increments('id').primary();
        table.string('type')
        table.string("url")
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('uploads')
};
