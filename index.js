import { MongoClient } from "mongodb";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected ✌😊");
  return client;
}

const client = await createConnection();

app.use(cors());
app.use(express.json());

app.get("/", function (request, response) {
  response.send("hello this a home page of shopping app");
});

app.get("/collection", async function (request, response) {
  const product = await client
    .db("products")
    .collection("item")
    .find({})
    .toArray();
  response.send(product);
});

app.post("/newCollection", async function (request, response) {
  const data = request.body;
  const result = await client.db("products").collection("item").insertOne(data);
  response.send(result);
});

app.listen(PORT, () => console.log(`APP is running ${PORT}`));