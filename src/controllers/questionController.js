const Question = require("../model/Question");

const getAllQuestions = async (req, res, next) => {
  let cachedData;
  let cacheTime;
  if (cacheTime && cacheTime > Date.now() - 30 * 1000) {
    return res.json({
      message: "All Questions",
      cache: true,
      results: cachedData,
    });
  }
  try {
    const questions = await Question.find({});

    cachedData = questions;
    cacheTime = Date.now();

    return res.json({
      results: questions,
      message: "All Questions",
    });
  } catch (error) {
    next(error);
  }
};

const getQuestionByTopic = async (req, res, next) => {
  const topic = req.params.topic;

  if (!topic) return res.status(400).json({ message: "Invalid topic" });

  let cachedData;
  let cacheTime;
  if (cacheTime && cacheTime > Date.now() - 30 * 1000) {
    return res.json({
      message: "Data fetched Successfully",
      cache: true,
      data: cachedData,
    });
  }
  try {
    const foundTopic = await Question.findOne({ topicName: topic });
    if (!foundTopic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    cachedData = foundTopic;
    cacheTime = Date.now();

    res.json({
      results: foundTopic,
      message: `Fetched Topic ${topic}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllQuestions, getQuestionByTopic };
