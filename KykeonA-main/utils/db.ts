// utils/db.ts
import { MongoClient } from "mongodb";

export async function fetchStoreItems() {
  try {
    const client = new MongoClient(process.env.DATABASE_URI!, {});
    await client.connect();
    const db = client.db("KykeonA");
    const collection = db.collection("storeitems");

    const data = await collection.find().toArray();

    await client.close();

    return { data };
  } catch (error) {
    console.error(error);
    return { error };
  }
}
