const booksController = require("../controllers/booksController");
const authenticateUser = require("../middlewares/auth");
const express = require("express");
const router = express.Router();

router.get("/", booksController.getAllBooks);
router.get("/:id", booksController.getOneBook);
router.post("/add", authenticateUser, booksController.addBook);
router.put("/:id/edit", booksController.updateBook);
router.delete("/:id/delete", booksController.deleteBook);

module.exports = router;
