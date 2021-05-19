const db = require("../../db");
const tableNames = require("../../constant/tableNames");

const fields = [
  "id",
  "name",
  "primary",
  "users_id",
  "created_at",
  "updated_at",
];
//Write queries
module.exports = {
  find() {
    // filter by ciy
    // join to city table
    return db(tableNames.classnames).select(fields);
  },
  async get(id) {
    // const [state] = await db(tableNames.state).select(fields).where({
    //   id: id,
    // });
    // return state;
    return db(tableNames.classnames)
      .select(fields)
      .where({
        id,
      })
      .first();
  },
  //update fn
  async put(id, changes) {
    return db(tableNames.classnames)
      .select(fields)
      .where({
        id,
      })
      .update(changes);
  },

  async del(id) {
    return db(tableNames.classnames)
      .select(fields)
      .where({
        id,
      })
      .del();
  },
};
