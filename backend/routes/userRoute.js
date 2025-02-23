const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require('../controllers/userController')

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const upload = require("../middleware/multerConfig")

const router = express.Router();



router.route("/register").post(upload.single('avatar'), registerUser);//after register token will generate


router.route("/login").post(loginUser)// after login token will generate and we store token in cookie instead of localstorage


router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, upload.single('avatar'), updateProfile);

router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);
router.route("/admin/user/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;