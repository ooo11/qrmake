
// this file do a database connection

const knex = require("knex");
const { Model } = require("objection");

const knexConfiq = require("../knexfile");

const environment = process.env.NODE_ENV || "development";
const connectionConfiq = knexConfiq[environment];

const connection = knex(connectionConfiq);

Model.knex(connection);
module.exports = connection;