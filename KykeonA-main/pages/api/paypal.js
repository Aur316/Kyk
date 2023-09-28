import fetch from "node-fetch";
import { fetchStoreItems } from "../../utils/db";

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const base = "https://api-m.sandbox.paypal.com";

const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET
    ).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};
async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    // Extract the order ID from the PayPal API response
    const orderId = jsonResponse.id;

    return {
      id: orderId, // Include the order ID in the response object
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

const createOrder = async (cart) => {
  try {
    // Fetch store items
    const { data, error } = await fetchStoreItems();

    if (error) {
      throw error;
    }

    const itemMap = {};
    data.forEach((item) => {
      itemMap[item._id.toString()] = item;
    });

    // Ensure cart.items is defined and is an array before proceeding
    if (!cart.items || !Array.isArray(cart.items)) {
      throw new Error("Cart items is undefined or not an array");
    }

    // Calculate total price
    let totalPrice = 0;
    cart.items.forEach((cartItem) => {
      if (itemMap[cartItem.id]) {
        totalPrice += itemMap[cartItem.id].price * cartItem.quantity;
      }
    });
    console.log(totalPrice);
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const payload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totalPrice.toFixed(2),
          },
        },
      ],
    };

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    });

    return handleResponse(response);
  } catch (error) {
    console.error(error);
  }
};

const captureOrder = async (orderID) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  return data;
};

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      if (req.url.includes("capture")) {
        const orderID = req.url.split("/")[3]; // extract orderID from URL
        const order = await captureOrder(orderID);
        res.status(200).json(order);
      } else {
        const cart = req.body; // TODO: make sure cart data is being sent in the request body
        const order = await createOrder(cart);
        res.status(200).json(order);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
