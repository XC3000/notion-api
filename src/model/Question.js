const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dsaTrackerSchema = new Schema({
  topicName: String,
  position: Number,
  started: Boolean,
  doneQuestions: Number,
  questions: [
    {
      Topic: String,
      Problem: String,
      Done: Boolean,
      Bookmark: Boolean,
      Notes: String,
      URL: String,
    },
  ],
});


// dsaTrackerSchema.set("collection", "bookstore");

module.exports = mongoose.model("Question", dsaTrackerSchema, "dsa-tracker");
