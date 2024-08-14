const express= require('express');
const app= express();
const mongoose= require('mongoose');
require('dotenv').config();
const productRoute= require('./routes/product');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port= process.env.port || 6000
const url= process.env.MONGO_URI

// MongoDB Connection
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{
    console.log("MongoDB Connected"); 
  })
  .catch((err)=>{
    console.log(err);
  })

app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`);  
})

app.use('/api', productRoute)