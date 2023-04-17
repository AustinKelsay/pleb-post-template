import { Schema, model, models } from "mongoose";

// Define the user schema
const UserSchema = new Schema({
  username: { type: String, required: true }, // Username of the user we will default to their public key
  pubkey: { type: String, required: true }, // Public key from the users lightning wallet
  k1: { type: String, required: true }, // The LNUrl challenge that the user signed with their lightning wallet for authentication
  wallet_id: { type: String, required: true }, // ID of the user's LNBits wallet
  wallet_admin: { type: String, required: true }, // Admin key for the user's LNBits wallet
  wallet_user: { type: String, required: true }, // The wallet user key for the user's LNBits wallet
  admin_key: { type: String, required: true }, // The admin key for the user's LNBits wallet
  in_key: { type: String, required: true }, // The invoice key for the user's LNBits wallet
  profilePhoto: {
    // Profile photo of the user generated when they sign up
    type: String,
    default: function () {
      return `https://secure.gravatar.com/avatar/${this._id}?s=90&d=identicon`; // Default profile photo URL
    },
  },
});

// Set the toJSON option for the user schema to include getters
UserSchema.set("toJSON", { getters: true });

// Set the transform function for the toJSON option to remove _id and __v fields from the returned JSON
UserSchema.options.toJSON.transform = (doc, ret) => {
  delete ret._id;
  delete ret.__v;
  return ret;
};

// Define the User model based on the user schema, or retrieve it if it already exists
const User = models.User || model("User", UserSchema);

// Export the User model
export default User;
