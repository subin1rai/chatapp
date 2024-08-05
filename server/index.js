require("dotenv").config(); 
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req,res)=>{
    res.send("welcome ")
})

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URL;

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});


mongoose.connect(uri)
.then(() => console.log("MongoDB connection established!"))
.catch((error) => console.log("MongoDB connection failed", error.message));
