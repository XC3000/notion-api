const express = require("express");
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");

const limiter = rateLimit({
  windowMs: 30 * 1000, // 30 Seconds
  max: 6, // Limit each IP to 2 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const speedLimiter = slowDown({
  windowMs: 30 * 1000, // 30 sec
  delayAfter: 4, // allow 4 requests per 30 Sec, then...
  delayMs: 500, // begin adding 500ms of delay per request above 100:
});

const emojis = require("./emojis");
const notion = require("./notion");
const question = require("./question");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/emojis", emojis);
router.use("/notion", notion);
router.use("/questions", limiter, speedLimiter, question);

module.exports = router;
