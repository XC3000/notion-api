const Question = require("../model/Question");

const getAllQuestions = async (req, res) => {
  //   console.log(req);
  const topic = req.query.topic;
  //   console.log(topic);

  if (topic === undefined) {
    const questions = await Question.find({});
    res.json({
      results: questions,
      message: "All Questions",
    });
  } else {
    const foundTopic = await Question.findOne({ topicName: topic });
    if (!foundTopic) {
      res.status(404).json({ message: "Topic not found" });
      return;
    }

    res.json({
      results: foundTopic,
      message: `Fetched Topic ${topic}`,
    });
  }
};

module.exports = { getAllQuestions };
