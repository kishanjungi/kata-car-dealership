
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  try {
    const { email, password } = req.body

    // validation — check fields exist
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    // check if email already used
    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(400).json({ message: 'Email already in use' })
    }

    // hash the password — NEVER store plain text
    const hashedPassword = await bcrypt.hash(password, 10)

    // save user to MongoDB
    const user = await User.create({ email, password: hashedPassword })

    // create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({ token })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { register }