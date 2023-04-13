import axios from "axios";

export const giveNewUserWallet = async (username) => {
  try {
    const header = {
      "Content-Type": "application/json",
      "X-Api-Key": process.env.LNBITS_KEY,
    };

    const body = {
      user_name: username,
      wallet_name: `${username}-wallet`,
      admin_id: process.env.LNBITS_ADMIN_ID,
    };

    const response = await axios.post(
      `${process.env.LN_BITS_USER_MANAGER_URL}`,
      body,
      { headers: header }
    );

    return response.data.wallets[0];
  } catch (error) {
    console.error("An error occurred in giveNewUserWallet:", error);
    throw error;
  }
};
