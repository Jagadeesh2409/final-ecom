const knexConfig = require('../knexfile')
require('dotenv').config()
const knex = require('knex')
const db = knex(knexConfig[process.env.DB_ENV])

module.exports = db