const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const auth = require("../middlewares/auth");
const userController = require("../controllers/user-controller");
// router.get("/", (req, res) => {
//   res.send("user route");
// });
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
router.get(
  "/login",
  [
    check("email", "enter a valid email").isEmail(),
    check("password", "enter password").isLength({ min: 6 }),
  ],
  userController.Login
);
router.get(
  "/changepassword/:id",
  [
    check("oldPassword").isLength({ min: 6 }),
    check("newPassword").isLength({ min: 6 }),
    check("confirmPassword").isLength({ min: 6 }),
  ],
  userController.changePassword
);
router.get("/:id", userController.getUser);
router.get("/", userController.getUsers);
module.exports = router;
