const { Model } = require("objection");
const tableNames = require("../../constant/tableNames");

const schema = require("./qrImages.schema.json");

class QRImages extends Model {
  static get tableName() {
    return tableNames.qrimages;
  }
  static get jsonSchema() {
    return schema;
  }
}

module.exports = QRImages;
