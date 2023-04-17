import connectMongo from "../../../db/connectMongo";
import Post from "../../../db/models/Post";

export default async function handler(req, res) {
  try {
    await connectMongo();

    switch (req.method) {
      case "GET": {
        return getPosts(req, res);
      }
      case "POST": {
        return addPost(req, res);
      }
      default: {
        return res.status(405).json({ error: "Method not allowed" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getPosts(req, res) {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function addPost(req, res) {
  try {
    const post = await Post.create(req.body);

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
