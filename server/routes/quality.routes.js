const express = require('express');
const router = express.Router({ mergeParams: true });
const Quality = require('../models/Quality');

router.get('/', async (req, res) => {
  try {
    const qualities = await Quality.find();
    res.status(200).send(qualities);
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    });
  }
});
module.exports = router;
