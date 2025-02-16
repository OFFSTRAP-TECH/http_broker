import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import cors from "cors";
const app = express();
const uri = "mongodb+srv://offstrap_admin:offstrap_admin@offstrapprototype.sdgbo.mongodb.net/?retryWrites=true&w=majority&appName=offstrapPrototype";

let client;
let db;



app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("<h2>OFFSTRAP.com</h2>");
});

app.get("/prototype/1", async (req, res) => {
    try{
        client = new MongoClient(uri);
        await client.connect();
        db = client.db("testDB");
        console.log("✅ Connected to MongoDB");
        const collection = db.collection("users");

        const data= await collection.findOne({});
        console.log(data);
        res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.status(201).json(data);
        client.close();
    }
    catch(err){
        console.log(err);

    }
    
});

app.post("/prototype/1", async (req, res) => {
    try {
        client = new MongoClient(uri);
        await client.connect();
        db = client.db("testDB");
        console.log("✅ Connected to MongoDB");
        const collection = db.collection("users");
        const jsonData = req.body;
        
        if (!jsonData || Object.keys(jsonData).length === 0) {
            return res.status(400).json({ error: "Invalid JSON data" });
        }

        const result = await collection.insertOne(jsonData);
        console.log("✅ Inserted:", result.insertedId);
        client.close();
        res.status(201).json({
            message: "Data stored successfully",
            id: result.insertedId
            
        });
        
    } catch (error) {
        console.error("❌ Insert Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//export default app;  // No app.listen() needed for Vercel


app.listen(9000,()=>{
    console.log("server live at 9000");
})

