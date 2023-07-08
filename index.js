import { MongoClient } from "mongodb";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 4550;

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

//listed company API

app.get("/basic", async function (request, response) {
  const product = await client
    .db("products")
    .collection("basic")
    .find({})
    .toArray();
  response.send(product);
});
app.get("/graph", async function (request, response) {
  const product = await client
    .db("products")
    .collection("graph")
    .find({})
    .toArray();
  response.send(product);
});
app.get("/piechart", async function (request, response) {
  const product = await client
    .db("products")
    .collection("piechart")
    .find({})
    .toArray();
  response.send(product);
});

//post..................

app.post("/basic/data", async function (request, response) {
  const data = request.body;
  const result = await client.db("products").collection("basic").insertOne(data);
  response.send(result);
});
app.post("/graph/data", async function (request, response) {
  const data = request.body;
  const result = await client.db("products").collection("graph").insertOne(data);
  response.send(result);
});
app.post("/piechart/data", async function (request, response) {
  const data = request.body;
  const result = await client.db("products")
  .collection("piechart").insertOne(data);
  response.send(result);
});

app.listen(PORT, () => console.log(`APP is running ${PORT}`));