const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const userController = require("../controllers/user-controller");
router.get("/", (req, res) => {
  res.send("user route");
});
router.get(
  "/signup",
  [
    check("name", "name is required").not().isEmpty(),
    check("username", "enter a valid useraname").not().isEmpty(),
    check("email", "enter student mail address").isEmail(),
    check("password", "enter password of minimum length 6").isLength({
      min: 6,
    }),
  ],
  userController.signUp
);
module.exports = router;
