const express = require("express");
const router = express.Router();

const questionController = require("../controllers/questionController");

router.get("/", questionController.getAllQuestions);
router.get("/:topic", questionController.getQuestionByTopic);

module.exports = router;
