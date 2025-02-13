import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";

const app = express();
const uri = "mongodb+srv://offstrap_admin:offstrap_admin@offstrapprototype.sdgbo.mongodb.net/?retryWrites=true&w=majority&appName=offstrapPrototype";

let client;
let db;

async function connectDB() {
    if (!client || !client.topology || !client.topology.isConnected()) {
        client = new MongoClient(uri);
        await client.connect();
        db = client.db("testDB");
        console.log("✅ Connected to MongoDB");
    }
}

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("<h2>OFFSTRAP.com</h2>");
});

app.post("/prototype/1", async (req, res) => {
    try {
        await connectDB();  // Ensure connection is established
        const collection = db.collection("users");
        const jsonData = req.body;

        if (!jsonData || Object.keys(jsonData).length === 0) {
            return res.status(400).json({ error: "Invalid JSON data" });
        }

        const result = await collection.insertOne(jsonData);
        console.log("✅ Inserted:", result.insertedId);

        res.status(201).json({
            message: "Data stored successfully",
            id: result.insertedId
        });
    } catch (error) {
        console.error("❌ Insert Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default app;  // No app.listen() needed for Vercel