
exports.up = function(knex) {
    return knex.schema.createTable('users',(table)=>{
        table.increments('id').primary();
        table.string('username').notNullable()
        table.string('email').notNullable().unique()
        table.string('password').notNullable()
        table.string('phoneNumber').unique()
        table.string('status').notNullable().defaultTo('ACTIVE')
        table.integer('profileId').unsigned().references('id').inTable('uploads').onDelete('SET NULL')
        table.boolean('is_admin').notNullable().defaultTo(false)
        table.boolean('email_verified')
        table.string('login_provider')
        table.string('google_id')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};


exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
};
