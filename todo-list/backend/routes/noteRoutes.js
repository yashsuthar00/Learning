const express = require('express');
const router = express.Router();
const {getNotes, createNote, updateNote, deleteNote} = require("../controllers/noteController");
const validateToken = require('../middleware/validTokenHandler');

router.use(validateToken);
router.route("/").get(getNotes).post(createNote);
router.route("/:id").put(updateNote).delete(deleteNote);

module.exports = router;