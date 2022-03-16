const express = require('express');

const emojis = require('./emojis');
const notion = require('./notion');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/notion', notion);

module.exports = router; 
