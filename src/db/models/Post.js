import { Schema, model, models } from "mongoose";

// Define the Post schema
const PostSchema = new Schema({
  title: { type: String, required: true }, // Title of the post, required
  description: { type: String, required: true }, // Description of the post, required
  author: { type: String, required: true }, // Author of the post, required
  tips: { type: Number, default: 0 }, // Number of tips received for the post, defaults to 0
  created: { type: Date, default: Date.now }, // Date and time the post was created, defaults to current date and time
});

// Set the toJSON option for the post schema to include getters
PostSchema.set("toJSON", { getters: true });

// Set the transform function for the toJSON option to remove _id and __v fields from the returned JSON
PostSchema.options.toJSON.transform = (doc, ret) => {
  delete ret._id;
  delete ret.__v;
  return ret;
};

// Define the Post model based on the post schema, or retrieve it if it already exists
const Post = models.Post || model("Post", PostSchema);

// Export the Post model
export default Post;
