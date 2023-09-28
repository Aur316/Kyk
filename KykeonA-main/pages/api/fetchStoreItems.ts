import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const client = new MongoClient(process.env.DATABASE_URI!, {});
      await client.connect();
      const db = client.db("KykeonA");
      const collection = db.collection("storeitems");
      const data = await collection.find().toArray();
      await client.close();
      res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
    return;
  }
  res.status(405).json({ error: "Method not allowed" });
}
