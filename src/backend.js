const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
app.use(express.json());

require("dotenv").config();

//So it can run locally
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true"); //for tokens

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

mongoose
  .connect(
    `mongodb+srv://manguini:RKsat1mKsRWGHPcl@fitnessapp.uvbptei.mongodb.net/prodle`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;
const WordSchema = new Schema({
  //should be word: String
  iambic: String,
});

const Words = mongoose.model("Words", WordSchema, "words");

//gets 17.3k words
app.get("/api/words", async (req, res) => {
  try {
    // Fetch all words from MongoDB
    const words = await Words.find();

    // Send them to the client
    res.status(200).json(words);
  } catch (err) {
    // Handle error
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

const UserSchema = new Schema({
  username: String,
  password: String,
  wins: Number,
  losses: Number,
  streak: Number
});

const Users = mongoose.model("Users", UserSchema, "users");


//register
app.post("/register", async (req, res) =>{
  const userExists = await Users.findOne({username: req.body.username});
  if(userExists){
    return res.status(400).send("User already exists");
  }
  try{
    const hashPW = await bcrypt.hash(req.body.password, 10);
    const user = new Users({
      username: req.body.username,
      password: hashPW,
      wins: 0,
      losses: 0,
      streak: 0
    });
    const newUser = await user.save();
    res.json(newUser);
  }
  catch(err){
    res.status(500).json({error: err.message});
  }
});

app.listen(5000, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
