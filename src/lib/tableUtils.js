// this fn is a reuseable func which all table will have it
function addDefaultColumns(table) {
  table.timestamps(false, true);
  table.datetime("deleted_at");
}


function references(table, tableName, notNullable = true) {
  const definition = table
    .integer(`${tableName}_id`)
    .unsigned()
    .references("id")
    .inTable(tableName)
    .onDelete("cascade");
  if (notNullable) {
    definition.notNullable();
  }
}

function url(table, columnName) {
  return table.string(columnName, 2000);
}

module.exports = {
  addDefaultColumns,
  references,
  url,
};
