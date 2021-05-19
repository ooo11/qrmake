const Knex = require("knex");

const tableNames = require("../../src/constant/tableNames");

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  const [alfa2] = await Promise.all([

    knex(tableNames.classnames)
      .where({
        name: "Dua Alfa",
      })
      .first(),
  ]);




    const [students_id] = await knex(tableNames.students)
    .insert({
      name: "Momo",
      classnames_id: alfa2.id,
    })
    .returning("id");

//   await knex(tableNames.students).insert({
//     name: "Momo",
//     classnames_id: alfa.id,
//   });

  await knex(tableNames.qrimages).insert({
    students_id,
    qr_img_url: "https://imgur.com/DW0KuKZ",
  });

  console.log(students_id);

};
