import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.DATABASE_URI!, {});

    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error(error);
  }
}

export default dbConnect;
