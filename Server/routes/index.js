const booksRoute = require('./booksRoutes');
const authRoute = require('./authRoutes');

const express = require('express');
const router = express.Router()

router.use('/auth',authRoute)
router.use('/books',booksRoute)

module.exports = router