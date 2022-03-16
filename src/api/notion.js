const { Client } = require("@notionhq/client");
const express = require("express");
const router = express.Router();
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

// Initializing Notion Client
const notion = new Client({ auth: process.env.NOTION_KEY });

// Initializing the Database Id
const databaseId = process.env.NOTION_DATABASE_ID;

let cachedData;
let cacheTime;

const apiKeys = new Map();
apiKeys.set("12345", true);

router.get(
  "/",
  limiter,
  speedLimiter,
  (req, res, next) => {
    const apiKey = req.get("X-API-KEY");
    if (apiKeys.has(apiKey)) {
      next();
    } else {
      const error = new Error("Invalid API KEY");
      next(error);
    }
  },
  async (req, res, next) => {
    if (cacheTime && cacheTime > Date.now() - 30 * 1000) {
      return res.json({
        message: "Data fetched Successfully",
        cache: true,
        data: cachedData,
      });
    }
    try {
      const payload = {
        path: `databases/${databaseId}/query`,
        method: "POST",
      };
      const { results } = await notion.request(payload);

      cachedData = results;
      cacheTime = Date.now();

      res.json({
        message: "Data fetched Successfully",
        data: results,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
