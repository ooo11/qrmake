const express = require("express");

const ClassName = require("./className.model");
const queries = require("./className.queries");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const className = await ClassName.query()
      .select(
        "id",
        "name",
        "primary",
        "users_id",
        "created_at",
        "updated_at",
      )
      .where("deleted_at", null);
    res.json(className);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const className = await ClassName.query().insert(req.body);
    res.json(className);
  } catch (error) {
    next(error);
  }
});

//get single className
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    //validate id?
    if (isNaN(id)) {
      const error = new Error("Invalid ID");
      res.status(422);
      throw error;
    } else {
      const className = await queries.get(id);
      if (className) {
        return res.json(className);
      }
      return next();
    }
  } catch (error) {
    next(error);
  }
});

//update className based on id
//update based on schema
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    if (isNaN(id)) {
      const error = new Error("Invalid ID");
      res.status(422);
      throw error;
    } else {
      const updatedClassName = await ClassName.query()
        .select(
          "id",
          "name",
          "primary",
          "users_id",
          "created_at",
          "updated_at",
        )
        .where("deleted_at", null)
        .where({ id })
        .update(changes);
      //const updatedClassName = await queries.put(id, changes);
      if (updatedClassName) {
        return res.json({ message: "className updated!" });
      }
      return next();
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    if (isNaN(id)) {
      const error = new Error("Invalid ID");
      res.status(422);
      throw error;
    } else {
      const deletedClassName = await ClassName.query()
        .where("deleted_at", null)
        .where({ id })
        .del();
      //const deletedclassName = await queries.del(id);
      if (deletedClassName) {
        return res.json({ message: "className deleted!" });
      }
      return next();
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
