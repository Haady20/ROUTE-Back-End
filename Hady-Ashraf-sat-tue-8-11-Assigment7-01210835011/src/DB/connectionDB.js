import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

export const db = client.db("Test");

const connectionStatus = async () => {
  try {
    await client.connect();
    console.log("Sucessfully Connected to DB.");
  } catch (error) {
    console.log("Can't Connect to DB.", error);
  }
};

export default connectionStatus;
