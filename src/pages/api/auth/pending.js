import User from "../../../db/models/User";
import connectMongo from "../../../db/connectMongo";

export default async function handler(req, res) {
  const { k1 } = req.query;

  if (!k1) {
    return res
      .status(400)
      .json({ status: "FAIL", message: "Missing k1 value" });
  }

  try {
    // Ensure the database connection is established
    await connectMongo();

    // Find a user with the given k1
    const user = await User.findOne({ k1 });

    if (user) {
      return res.status(200).json({ status: "OK", user });
    } else {
      return res
        .status(200)
        .json({ status: "FAIL", message: "User not found" });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ status: "FAIL", message: e.message });
  }
}
