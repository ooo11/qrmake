const { Model } = require("objection");
const tableNames = require("../../constant/tableNames");

const schema = require("./students.schema.json");

class Students extends Model {
  static get tableName() {
    return tableNames.students;
  }
  static get jsonSchema() {
    return schema;
  }
}

module.exports = Students;
