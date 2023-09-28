import { createHmac } from "crypto";

export default async (req, res) => {
  try {
    // PUT API IN ENV, MAKE A MESSAGE IF SOMEONE MALICIOUSLY TRIES TO HIT THE API
    const btcpaySecret = "gid8crAbDfu6cTiHox26eLDFmMd";
    const btcpaySig = req.headers["btcpay-sig"];

    const getRawBody = () => {
      return new Promise((resolve) => {
        let data = "";
        req.on("data", (chunk) => {
          data += chunk;
        });
        req.on("end", () => {
          resolve(data);
        });
      });
    };

    const rawBody = await getRawBody();

    const hash = createHmac("sha256", btcpaySecret)
      .update(rawBody)
      .digest("hex");

    // Compare the hash with the BTCPAY-SIG header value
    if (hash !== btcpaySig.split("=")[1]) {
      return res.status(400).send("Invalid signature");
    }

    const parsedBody = JSON.parse(rawBody);

    res.status(200).send("Webhook received");
  } catch (error) {
    console.error("Error handling BTCPay webhook", error);
    res.status(500).send("Server error");
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
