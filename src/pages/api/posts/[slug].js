import connectMongo from "../../../db/connectMongo";
import Post from "../../../db/models/Post";

export default async function handler(req, res) {
  try {
    await connectMongo();

    switch (req.method) {
      case "GET": {
        return getPostById(req, res);
      }
      case "PUT": {
        return updatePostById(req, res);
      }
      case "DELETE": {
        return deletePostById(req, res);
      }
      default: {
        return res.status(405).json({ error: "Method not allowed" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updatePostById(req, res) {
  try {
    const post = await Post.findByIdAndUpdate(req.query.slug, req.body, {
      new: true,
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deletePostById(req, res) {
  try {
    const post = await Post.findByIdAndDelete(req.query.slug);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getPostById(req, res) {
  try {
    const post = await Post.findById(req.query.slug);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
