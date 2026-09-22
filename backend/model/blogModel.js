const mongoose = require("mongoose");

const schema = mongoose.Schema;

const blogSchema = new schema(
  {
    blogTitle: { type: String, required: true },
    blogPreview: { type: String, required: true },
    blogCategory: { type: String, lowercase: true },
    blogBody: { type: String, required: true },
    blogImage: { type: String  },
    blogImagePublicId: { type: String  },
    blogImagePath: { type: String  },
    userId: { type: String, required: true },
  },
  { timestamps: true },
);

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
