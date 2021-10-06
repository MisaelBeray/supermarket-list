import { MongoClient, Db } from "mongodb";

interface ConnectType {
  db: Db;
  client: MongoClient;
}

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function connect(): Promise<ConnectType> {
  if (!client.isConnected()) await client.connect();

  const db = client.db("supermarket-list");
  return { db, client };
}
