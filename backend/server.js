const express = require("express");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const bodyparser = require("body-parser");
const cors = require("cors");

dotenv.config();

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

//creating new database if not exists
const dbName = "ComplaintsDB";
const app = express();
const port = 3000;
app.use(bodyparser.json());
app.use(cors());
client.connect();

//gets the data
app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("complaints");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

//posts the data of complaint to database
app.post("/submit", async (req, res) => {
  const name = req.body; //req.body ka content will go in name and will be inserted
  const db = client.db(dbName);
  const collection = db.collection("complaints");
  const findResult = await collection.insertOne(name);
  res.send({ success: true, result: findResult });
});

//posts data of contact us form to database
app.post("/contact", async (req, res) => {
  const name = req.body; 
  const db = client.db(dbName);
  const collection = db.collection("contact");
  const findResult = await collection.insertOne(name);
  res.send({ success: true, result: findResult });
});


//deletes the data
app.delete("/", async (req, res) => {
  const name = req.body;
  const db = client.db(dbName);
  const collection = db.collection("complaints");
  const findResult = await collection.deleteOne(name);
  res.send({ success: true, result: findResult });
});

app.listen(port, () => {
  console.log(`Complaint Website listening on port http://localhost:${port}`);
});

