import express from "express"
import bodyParser from "body-parser"
import { MongoClient } from 'mongodb';

//offstrap_admin: offstrap_admin
const app=express()
const uri = "mongodb+srv://offstrap_admin:offstrap_admin@offstrapprototype.sdgbo.mongodb.net/?retryWrites=true&w=majority&appName=offstrapPrototype";
const client = new MongoClient(uri);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const port=8000;

try {
    await client.connect();
    console.log("Connected to MongoDB");
    

  } catch (error) {
    console.error("Connection error:", error);
  }

app.get("/",(req,res)=>{

    
    res.send("<h2>OFFSTRAP.com</h2>");
})

app.post("/prototype/1",async (req,res,next)=>{
    

        const db = client.db("testDB");
        const collection = db.collection("users");
        const jsonData = req.body;
        const result = await collection.insertOne(jsonData);
        console.log("Inserted");
        console.log(result);
        res.status(200);
})
app.listen(port,()=>{
    console.log(`server live at ${port}`)
})