const mongoose = require("mongoose");

const schema = mongoose.Schema;

const draftSchema = new schema(
  {
    blogTitle: { type: String},
    blogCategory: { type: String},
    blogBody: { type: String },
    userId: { type: String, required: true },
    blogId: { type: String },
  },
  { timestamps: true },
);

const Draft = mongoose.model("draft", draftSchema);

module.exports = Draft;
