const Knex = require("knex");

const tableNames = require("../../src/constant/tableNames");
const {
  addDefaultColumns,
  references,
  url,
} = require("../../src/lib/tableUtils");

/**
 * @param {Knex} knex
 */

exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.users, (table) => {
    table.increments().notNullable();
    table.string("name").notNullable().unique();
    table.string("password").notNullable();
    addDefaultColumns(table);
  });

  await knex.schema.createTable( tableNames.classnames, (table)=>{
    table.increments().notNullable();
    table.string("name").notNullable();
    table.float("primary").notNullable();
    references(table, tableNames.users,false);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.students, (table)=>{
    table.increments().notNullable();
    table.string("name").notNullable();
    references(table, tableNames.classnames,false);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.qrimages, (table) => {
    table.increments().notNullable();
    url(table, "qr_img_url");
    references(table, tableNames.students,false);
    addDefaultColumns(table);
  });


};

exports.down = function (knex) {
  return Promise.all(
    [
      tableNames.qrimages,
      tableNames.students,
      tableNames.classnames,
      tableNames.users,
    
    ].map((tableName) => knex.schema.dropTable(tableName))
  );
};
