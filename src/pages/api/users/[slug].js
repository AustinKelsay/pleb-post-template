import connectMongo from "../../../db/connectMongo";
import User from "../../../db/models/User";

export default function handler(req, res) {
  switch (req.method) {
    case "GET": {
      return getUserByUserName(req, res);
    }
    default: {
      return res.status(405).json({ error: "Method not allowed" });
    }
  }
}

async function getUserByUserName(req, res) {
  try {
    await connectMongo();

    const user = await User.find({ username: req.query.slug });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
