const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateUserData = require('../utils/helpers');
const router = express.Router({ mergeParams: true });
const tokenService = require('../services/token.service');
// api/auth/signUp
/*
1. get data from req
2. check if users already exists
3. hash password
4. create user
5. generate tokens
*/
router.post('/signUp', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: {
          message: 'EMAIL_EXISTS',
          code: 400,
        },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      ...generateUserData(),
      ...req.body,
      password: hashedPassword,
    });

    const tokens = tokenService.generate({ _id: newUser._id });
    res.status(201).send({ ...tokens, userId: newUser._id });
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    });
  }
});

router.post('/signInWithPassword', async (req, res) => {});

router.post('/token', async (req, res) => {});

module.exports = router;
