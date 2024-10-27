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

//posts data of user login form to database
app.post("/userlogin", async (req, res) => {
  const newUser = req.body;
  const uri = "mongodb://localhost:27017/userlogin";

  try {
    const client = await MongoClient.connect(uri, {
    });
    const database = client.db("ComplaintsDB");
    const collection = database.collection("userlogins");

    // Check if email already exists with findOne()
    const existingUser = await collection.findOne({ email: newUser.email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }
    // Insert new user if email doesn't exist
    const result = await collection.insertOne(newUser);
    console.log("User created successfully!", result);
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } 
});

//gets data of userlogin form to database
app.post("/userlogincheck", async (req, res) => {
  const { username, password, pincode } = req.body;
  const uri = "mongodb://localhost:27017/userlogincheck";

  try {
    
    const client = await MongoClient.connect(uri, {
    });
    const database = client.db("ComplaintsDB");
    const collection = database.collection("userlogins");

    const user = await collection.findOne({ email: username });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (user.pass != password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    
    if (user.pin != pincode) {

      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//posts data of admin login form to database
app.post("/adminlogin", async (req, res) => {
  const newAdmin = req.body;
  const uri = "mongodb://localhost:27017/adminlogin";

  try {
    const client = await MongoClient.connect(uri, {
    });
    const database = client.db("ComplaintsDB");
    const collection = database.collection("adminlogins");

    // Check if email already exists with findOne()
    const existingUser = await collection.findOne({ email: newAdmin.email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }
    // Insert new user if email doesn't exist
    const result = await collection.insertOne(newAdmin);
    console.log("User created successfully!", result);
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } 
});

//checks data of adminlogin form to database
app.post("/adminlogincheck", async (req, res) => {
  const { username, password } = req.body;
  const uri = "mongodb://localhost:27017/adminlogincheck";

  try {
    const client = await MongoClient.connect(uri, {
    });
    const database = client.db("ComplaintsDB");
    const collection = database.collection("adminlogins");

    const user = await collection.findOne({ email: username });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.pass != password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } 
});
//updates the data of a complaint in the database
app.put("/updateComplaint", async (req, res) => {
  const { id, firstname, lastName, city, state, pin, email, issue } = req.body;
  const db = client.db(dbName);
  const collection = db.collection("complaints");

  try {
    const result = await collection.updateOne(
      { id: parseInt(id) },
      { $set: { firstname, lastName, city, state, pin, email, issue } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json({ message: "Complaint updated successfully", result });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//deletes the data
app.delete("/resolve", async (req, res) => {
  const cmp = req.body;
  console.log(cmp.id)
  let delid = parseInt(cmp.id)
  const db = client.db(dbName);
  const collection = db.collection("complaints");
  const findResult = await collection.deleteOne({id: delid});
  res.send({ success: true, result: findResult });
});

app.listen(port, () => {
  console.log(`Complaint Website listening on port http://localhost:${port}`);
});
