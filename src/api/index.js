const express = require('express');

const emojis = require('./emojis');
const notion = require('./notion');
const question = require('./question');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/notion', notion);
router.use('/questions', question);

module.exports = router; 
