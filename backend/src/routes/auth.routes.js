const express = require('express')
const router = express.Router()
const { register } = require('../controllers/auth.controller')

// POST /api/auth/register → runs register function
router.post('/register', register)

module.exports = router