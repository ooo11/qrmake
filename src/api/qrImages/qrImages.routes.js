const express = require("express");

const QRImages = require("./qrImages.model");
const { isLoggedIn } = require("../auth/auth.middleware");

const router = express.Router();

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const qrImage = await QRImages.query().insert(req.body);
    res.json(qrImage);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const qrImage = await QRImages.query()
      .select("id", "qr_img_url", "students_id", "created_at", "updated_at")
      .where("deleted_at", null);
    res.json(qrImage);
  } catch (error) {
    next(error);
  }
});

//get single qr_type
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    //validate id?
    if (isNaN(id)) {
      const error = new Error("Invalid QR ID");
      res.status(422);
      throw error;
    } else {
      const qrImage = await QRImages.query()
        .select("id", "qr_img_url", "students_id", "created_at", "updated_at")
        .where({ id })
        .first();
      if (qrImage) {
        return res.json(qrImage);
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
      const deletedqrImg = await QRImages.query().where({ id }).del();
      if (deletedqrImg) {
        return res.json({ message: "QR image have been deleted!" });
      }
      return next();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
