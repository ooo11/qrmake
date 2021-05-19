const Knex = require("knex");

const tableNames = require("../../src/constant/tableNames");

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  const [cikgu] = await Promise.all([
    knex(tableNames.users)
      .where({
        name: "Cikgu",
      })
      .first(),
  ]);

  const kelas = {
    name: "Dua Alfa",
    primary:"2",
    users_id: cikgu.id,
  };

  const [createdkelas] = await knex(tableNames.classnames)
    .insert(kelas)
    .returning("*");


  // await knex(tableNames.classnames).insert({
  //   name: "2Alfa",
  //   primary:"2",
  //   users_id: cikgu.id,
  // });

  
  console.log("Created Kelas: "+ createdkelas.name);
};
