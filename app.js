const express = require('express');
const mongoose = require('mongoose');
const router = require ('./routes/book-routes');
const cors = require ("cors");
const app = express();
const path = require('path');
const port = process.env.PORT || 3002;
const newSchema = require('./model/userModel')
const userRoutes = require('./routes/user')
const dotenv = require('dotenv')

dotenv.config();

// Middleware 
app.use(express.json());
app.use(cors());
app.use ("/books" , router);

//routes
app.use('/api/user', userRoutes)

app.get("/",cors(),(req,res) => {

})

app.post("/login", async(req,res) => {
  const {email,password} =req.body

  try {

    const check = await collection.findOne({email:email})

    if(check) {
      res.json("exist")
    }
    else{
      res.json("notexist")
    }
  }
  catch(e){
    res.json("notexist")
  }

})



app.post("/signup", async(req,res) => {
  const {name,email,password} =req.body

  const data = {
    name:name,
    email:email,
    password: password
  }

  try {

    const check = await collection.findOne({email:email})

    if(check) {
      res.json("exist")
    }
    else{
      res.json("notexist")
      await collection.insertMany({data})
    }
  }
  catch(e){
    res.json("notexist")
  }

})

// // Deployment
// const __dirname1 = path.resolve();
// if(process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname1 , "book-store/build")));

//   app.get('*', (req,res) => {
//     res.sendFile(path.resolve(__dirname1 , "book-store", "build" , "index.html"));
//   });
// } else {
//   app.get ("/" , (req,res) => {
//     res.send("API is running successfully");
//   });
// }




mongoose.connect(
  "mongodb+srv://admin:knkq6qPlXF5nJTPV@cluster0.ywhs7aq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
).then(() => console.log("Connected to Database"))
.then(() => {
  app.listen(port);
}).then(() => {
  console.log('Server conected at port ', port)
})
.catch((err) => console.log(err));
// admin
// knkq6qPlXF5nJTPV