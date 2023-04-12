import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  tips: { type: Number, default: 0 },
});

PostSchema.set("toJSON", { getters: true });

PostSchema.options.toJSON.transform = (doc, ret) => {
  delete ret._id;
  delete ret.__v;
  return ret;
};

const Post = models.Post || model("Post", PostSchema);

export default Post;
