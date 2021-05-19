const express = require("express");

const Users = require("./users.model");
const tableNames = require("../../constant/tableNames");

const router = express.Router();
const bcrypt = require("bcrypt");
const yup = require("yup");
const jwt = require("../../lib/jwt");
const { isLoggedIn } = require("../auth");

const errorMessages = {
  invalidLogin: "Invalid login.",
  nameInUse: "Name already in use.",
};

const schema = yup.object().shape({
  name: yup.string().trim().min(2).required(),
  password: yup
    .string()
    .min(8)
    .max(200)
    .matches(
      /[^A-Za-z0-9]/,
      "password must contain a special character (eg: #!@$%^&*)"
    )
    .matches(/[A-Z]/, "password must contain at least 1 uppercase letter")
    .matches(/[a-z]/, "password must contain at least 1 lowercase letter")
    .matches(/[0-9]/, "password must contain a number")
    .required(),
  newpassword: yup
    .string()
    .min(8)
    .max(200)
    .matches(
      /[^A-Za-z0-9]/,
      "new password must contain a special character (eg: #!@$%^&*)"
    )
    .matches(/[A-Z]/, "new password must contain at least 1 uppercase letter")
    .matches(/[a-z]/, "new password must contain at least 1 lowercase letter")
    .matches(/[0-9]/, "new password must contain a number"),
});

router.get("/", isLoggedIn, async (req, res) => {
  const user = await Users.query()
    .select("id", "name", "password")
    .where("deleted_at", null);

  res.json(user);
});

router.get("/:id", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  try {
    if (isNaN(id)) {
      const error = new Error("Invalid id");
      res.status(422);
      throw error;
    } else {
      const user = await Users.query()
        .select("id", "name", "password")
        .where({ id })
        .first();
      if (user) {
        res.json(user);
      } else {
        return next();
      }
    }
  } catch (error) {
    next(error);
  }
});

router.post("/signup", async (req, res, next) => {
  const { name, password } = req.body;
  try {
    const createUser = { name, password };
    await schema.validate(createUser, {
      abortEarly: false,
    });
    const userExist = await Users.query().where({ name }).first();
    if (userExist) {
      const error = new Error(errorMessages.nameInUse);
      res.status(403);
      throw error;
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      const insertNewUser = await Users.query().insert({
        name,
        password: hashedPassword,
      });

      delete insertNewUser.password;

      const payload = {
        id: insertNewUser.id,
        
        name,
      };
      const token = await jwt.sign(payload);
      res.json({
        user: payload,
        token,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/signin", async (req, res, next) => {
  const { name, password } = req.body;
  try {
    await schema.validate(
      {
        name,
        password,
      },
      {
        abortEarly: false,
      }
    );
    const user = await Users.query().where({ name }).first();
    if (!user) {
      const error = new Error(errorMessages.invalidLogin);
      res.status(403);
      throw error;
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      const error = new Error(errorMessages.invalidLogin);
      res.status(403);
      throw error;
    }

    const payload = {
      id: user.id,
      name,
    };
    const token = await jwt.sign(payload);
    res.json({
      user: payload,
      token,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  try {
    await schema.validate(req.body, {
      abortEarly: false,
    });
    if (isNaN(id)) {
      const error = new Error("Invalid id");
      res.status(422);
      throw error;
    } else {
      const user = await Users.query().where({ id }).first();
      if (!user) {
        const error = new Error("Invalid id");
        res.status(403);
        throw error;
      }
      const updatedProfile = req.body;
      const validPassword = await bcrypt.compare(
        updatedProfile.password,
        user.password
      );
      if (!validPassword) {
        const error = new Error("Wrong Passowrd!");
        res.status(403);
        throw error;
      }
      updatedProfile.newpassword = await bcrypt.hash(
        updatedProfile.newpassword,
        13
      );
      const newProfile = await Users.query().where({ id }).update({
        name: updatedProfile.name,
        password: updatedProfile.newpassword,
      });
      delete newProfile.password;

      res.json("Profile update!");
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  try {
    if (isNaN(id)) {
      const error = new Error("Invalid id");
      res.status(422);
      throw error;
    } else {
      const user = await Users.query().where({ id }).first();
      if (!user) {
        const error = new Error("Invalid id");
        res.status(403);
        throw error;
      }
      const deleteProfile = req.body;
      const validPassword = await bcrypt.compare(
        deleteProfile.password,
        user.password
      );
      if (!validPassword) {
        const error = new Error("Wrong Passowrd!");
        res.status(403);
        throw error;
      }

      await Users.query().where({ id }).del();

      res.json("Profile deleted!");
    }
  } catch (error) {
    next(error);
  }
});

router.use;

module.exports = router;
