const { Model } = require("objection");
const db = require("../../db");
const tableNames = require("../../constant/tableNames");

const schema = require("./users.schema.json");

class Users extends Model {
  static get tableName() {
    return tableNames.users;
  }
  static get jsonSchema() {
    return schema;
  }
}

module.exports = Users;
