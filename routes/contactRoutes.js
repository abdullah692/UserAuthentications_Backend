const express = require("express");

const router = express.Router();
const {
  getContacts,
  getContactById,
  postContact,
  updateContact,
  deleteContact,
} = require("../Controller/contactContoller");
const validateToken = require("../middleware/verifyTokenHandle");


router.use(validateToken);
router.route("/").get(getContacts).post(postContact);

router.route("/:id").get(getContactById).put(updateContact).delete(deleteContact);

// router.route("/").post(postContact);

// router.route("/:id").put(updateContact);

// router.route("/:id").delete(deleteContact);

module.exports = router;
