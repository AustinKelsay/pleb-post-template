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

    console.log("giveNewUserWallet response", response.data.wallets[0]);

    return response.data.wallets[0];
  } catch (error) {
    console.error("An error occurred in giveNewUserWallet:", error);
    throw error;
  }
};

export const createInvoice = async (user) => {
  try {
    const header = {
      "Content-Type": "application/json",
      "X-Api-Key": user.in_key,
    };

    const body = {
      memo: "tip",
      out: false,
      amount: 1,
    };

    const response = await axios.post(
      `https://d42da20dc9.d.voltageapp.io/api/v1/payments`,
      body,
      { headers: header }
    );

    return response.data.payment_request;
  } catch (error) {
    console.error("An error occurred in createInvoice:", error);
    throw error;
  }
};

export const payInvoice = async (invoice, session) => {
  try {
    const header = {
      "Content-Type": "application/json",
      "X-Api-Key": session.user.admin_key,
    };

    const body = {
      out: true,
      bolt11: invoice,
    };

    const response = await axios.post(
      `https://d42da20dc9.d.voltageapp.io/api/v1/payments`,
      body,
      { headers: header }
    );

    return response.data;
  } catch (error) {
    console.error("An error occurred in payInvoice:", error);
    throw error;
  }
};

export const tipAction = async (username, session) => {
  try {
    const response = await axios.get(`/api/users/${username}`);

    const user = response.data[0];

    if (user) {
      const invoice = await createInvoice(user);

      if (invoice) {
        const tip = await payInvoice(invoice, session);

        console.log("tip", tip);

        if (tip) {
          return true;
        }
      }
    }
  } catch (error) {
    console.error("An error occurred in tipAction:", error);
    throw error;
  }
};
