const mongoose = require("mongoose");

const escalationSchema = new mongoose.Schema({
  productGroup: String,
  title: String,
  body: String,
  date: String,
});

const commentSchema = new mongoose.Schema({
  escalationId: { type: mongoose.Schema.Types.ObjectId, ref: "Escalation" },
  user: String,
  date: String,
  commentBody: String,
});

const Escalation = mongoose.model("Escalation", escalationSchema);
const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Escalation, Comment };
