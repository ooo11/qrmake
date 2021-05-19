const { Model } = require("objection");
const tableNames = require("../../constant/tableNames");

const schema = require("./className.schema.json");

class ClassName extends Model {
  static get tableName() {
    return tableNames.classnames;
  }
  static get jsonSchema() {
    return schema;
  }
}

module.exports = ClassName;
