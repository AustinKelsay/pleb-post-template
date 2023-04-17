import User from "../../../db/models/User";
import connectMongo from "../../../db/connectMongo";

export default async function handler(req, res) {
  const { k1 } = req.query;

  // Ensure the k1 value is provided
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

    // Return the user if found
    if (user) {
      return res.status(200).json({ status: "OK", user });
    } else {
      // Return a failure if the user is not found so the client can keep polling
      return res
        .status(200)
        .json({ status: "FAIL", message: "User not found" });
    }
  } catch (e) {
    return res.status(500).json({ status: "FAIL", message: e.message });
  }
}
