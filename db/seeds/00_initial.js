const bcrypt = require("bcrypt");
const Knex = require("knex");
const tableNames = require("../../src/constant/tableNames");
/**
 * @param { Knex } knex
 */

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await tableNames.users.reduce(async (promise, tableName) => {
    await promise;
    console.log("clearing table", tableName);
    return knex(tableName).del();
  }, Promise.resolve());
};

exports.seed = async (knex) => {
  //seed for user
  const password = "test";

  const user = {
    name: "Cikgu",
    password: await bcrypt.hash(password, 12),
  };

  const [createdUser] = await knex(tableNames.users)
    .insert(user)
    .returning("*");

  console.log("Created user: " + { password }, createdUser);
};
