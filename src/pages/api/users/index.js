import connectMongo from "../../../src/db/connectMongo";
import User from "../../../src/db/models/User";

export default function handler(req, res) {
  switch (req.method) {
    case "GET": {
      return getUsers(req, res);
    }
    case "POST": {
      return addUser(req, res);
    }
    default: {
      return res.status(405).json({ error: "Method not allowed" });
    }
  }
}

async function getUsers(req, res) {
  try {
    await connectMongo();

    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function addUser(req, res) {
  try {
    await connectMongo();

    const user = await User.create(req.body.user);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
