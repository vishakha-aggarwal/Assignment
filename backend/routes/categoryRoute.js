const express = require("express");
const { createCategory, getAllCategory, updateCategory, deleteCategory, getCategoryDetails } = require("../controllers/categoryController");
const { isAuthenticatedUser, authorisedRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/admin/category/create").post(isAuthenticatedUser, authorisedRoles("admin"),createCategory);

router.route("/category/all").get(isAuthenticatedUser, getAllCategory);

router.route("/admin/category/:id").put(isAuthenticatedUser, authorisedRoles("admin"), updateCategory);

router.route("/admin/category/:id").delete(isAuthenticatedUser, authorisedRoles("admin"),deleteCategory);

router.route("/admin/category/:id").get(getCategoryDetails);

module.exports = router;