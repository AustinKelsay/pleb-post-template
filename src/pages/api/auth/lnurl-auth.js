import { utils, verify } from "@noble/secp256k1";
import User from "../../../db/models/User";
import connectMongo from "../../../db/connectMongo";
import { giveNewUserWallet } from "../../../lightning/lnBits";

function verifySig(sig, k1, key) {
  // Verify a secp256k1 signature
  const sigB = utils.hexToBytes(sig);
  const k1B = utils.hexToBytes(k1);

  // Verify the signature using the secp256k1 library
  return verify(sigB, k1B, key);
}

async function findAndUpdateOrCreateUser(k1, pubkey) {
  // Find the user by their pubkey
  const user = await User.findOne({ pubkey });

  // If the user exists, update their k1
  if (user && user.k1) {
    // Update the user's k1 with the new one
    user.k1 = k1;
    await user.save();
  } else {
    // If the user doesn't exist, create a new wallet for them
    const wallet = await giveNewUserWallet(pubkey);
    // Create a new user with the wallet details
    await User.create({
      username: pubkey,
      pubkey,
      k1: k1,
      wallet_id: wallet.id,
      wallet_admin: wallet.admin,
      wallet_user: wallet.user,
      admin_key: wallet.adminkey,
      in_key: wallet.inkey,
    });
  }
}

export default async function handler(req, res) {
  const { tag, k1, sig, key } = req.query;

  if (tag == "login" && k1 && sig && key) {
    try {
      if (verifySig(sig, k1, key)) {
        // Ensure the database connection is established
        await connectMongo();

        // Find the user and update their k1 or create a new user
        await findAndUpdateOrCreateUser(k1, key);

        return res.status(200).json({ status: "OK", k1, pubkey: key });
      } else {
        return res
          .status(401)
          .json({ status: "FAIL", message: "Invalid signature" });
      }
    } catch (e) {
      console.error(e);
      return res.status(500).json({ status: "FAIL", message: e.message });
    }
  }

  return res
    .status(400)
    .json({ status: "FAIL", message: "Missing required parameters" });
}
