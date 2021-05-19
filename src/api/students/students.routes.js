const express = require("express");

const Students = require("./students.model");
const { isLoggedIn } = require("../auth/auth.middleware");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const classnames = await Students.query()
      .select(
        "id",
        "name",
        "classnames_id",
        "created_at",
        "updated_at"
      )
      .where("deleted_at", null);
    res.json(classnames);
  } catch (error) {
    next(error);
  }
});

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const student = await Students.query().insert(req.body);
    res.json(student);
  } catch (error) {
    next(error);
  }
});

//get single item
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    //validate id?
    if (isNaN(id)) {
      const error = new Error("Invalid ID");
      res.status(422);
      throw error;
    } else {
      const student = await Students.query()
        .select(
          "id",
          "name",
          "classnames_id",
          "created_at",
          "updated_at"
        )
        .where({ id });
      if (student) {
        return res.json(student);
      }
      return next();
    }
  } catch (error) {}
});

//update item based on id
//update based on schema
router.put("/:id", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    if (isNaN(id)) {
      const error = new Error("Invalid ID");
      res.status(422);
      throw error;
    } else {
      const updatedStudent = await Students.query()
        .where({ id })
        .update(changes);
      if (updatedStudent) {
        return res.json({ message: "Student info updated!" });
      }
      return next();
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  try {
    if (isNaN(id)) {
      const error = new Error("Invalid ID");
      res.status(422);
      throw error;
    } else {
      const deletedStudent = await Students.query()
        .where("deleted_at", null)
        .where({ id })
        .del();
      if (deletedStudent) {
        return res.json({ message: "Student info deleted!" });
      }
      return next();
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
