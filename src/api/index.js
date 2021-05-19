const express = require("express");

const router = express.Router();
const users = require("./users/users.routes");
const classnames = require("./classNames/className.routes");
const students = require("./students/students.routes");
const qrImages = require("./qrImages/qrImages.routes");


router.get("/", (req, res) => {
  res.json({
    messages: "Here is my api 🔥 ",
  });
});

router.use("/users", users);
router.use("/class",classnames);
router.use("/students",students);
router.use("/qr",qrImages);

module.exports = router;
