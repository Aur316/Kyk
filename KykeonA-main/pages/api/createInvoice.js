import { fetchStoreItems } from "../../utils/db";

export default async (req, res) => {
  try {
    const apikey = "9cf87cf0072acb7afcff7d7a849de64686d909ca";
    const storeId = "7WBrfHkq2thju2VCPQbHAQWQjdWeUCQAitYkabBRdVgU";
    const { data, error } = await fetchStoreItems();
    if (error) {
      throw error;
    }

    // Create an item map for easy lookup
    const itemMap = {};
    data.forEach((item) => {
      itemMap[item._id.toString()] = item;
    });

    // Calculate total price
    let totalPrice = 0;
    req.body.items.forEach((cartItem) => {
      if (itemMap[cartItem._id]) {
        totalPrice += itemMap[cartItem._id].price * cartItem.quantity;
      }
    });

    const invoiceData = {
      amount: totalPrice,
      currency: "EUR",
      metadata: {
        orderInfo: {
          description: "Test order for 1 Euro",
        },
      },
      receipt: {
        enabled: true,
      },
    };

    const response = await fetch(
      `https://kykeondnsendpoint.duckdns.org/api/v1/stores/${storeId}/invoices`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${apikey}`,
        },
        body: JSON.stringify(invoiceData),
      }
    );

    if (!response.ok) {
      console.log("Response not okay, response status:", response.statusText);
      throw new Error("Network response was not ok: " + response.statusText);
    }

    const serverInfo = await response.json();

    res.status(200).json(serverInfo);
  } catch (error) {
    console.error("Error caught:", error);
    res.status(500).json({ error: error.message });
  }
};
