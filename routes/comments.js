const express = require('express')
const router = express.Router()
const commentsCtrl = require('../controllers/comments')

router.post('/cars/:id/reviews', reviewsCtrl.create)

module.exports = router
