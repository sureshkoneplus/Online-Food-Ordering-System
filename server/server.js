const https = require('https');
const fs = require('fs');


const express = require('express')

const mongoose = require('mongoose')

const cors = require('cors')

const bodyParser = require('body-parser')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const User = require('./models/usersSchema')

const Order = require('./models/Order')

const SECRETE_KEY = "secretkey"

//connect to express app
const app = express()



//connet to MongoDB
mongoose.connect('mongodb://localhost:27017/OnlineFoodOrderingSyatem', {
 
})
.then(()=>{
    app.listen(3005,()=>{
        console.log('server is connected to port and connected to MonoDB')
    })
})
.catch((error) => {
    console.log('Unable to connect the server and/or MongoDB')
})

//middleware
app.use(bodyParser.json())
app.use(cors())


//Routes
    
// User Registration
app.post('/register',async (req,res) =>{
    try{
        const {firstname,lastname,email,mobile,password} = req.body
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({firstname,lastname,email,mobile,password:hashedPassword})
        await newUser.save()
        res.status(201).json({message:"User Created Successfully"})
    }catch(error){
        res.status(500).json({error:"Error signing up"})
    }
})


//GET REGISTERED USERS
app.get('/register',async(req,res) => {
    try{
        const users = await User.find()
        res.status(201).json(users)
    }catch(error){
        res.status(500).json({error:'Unable to get users'})
    }
})



//GET LOGIN
app.post('/login', async(req,res) =>{
  try{
      const {email,password} = req.body
      const user = await User.findOne({email})
      console.log(user)
      if(!user){
          return res.status(401).json({error:'Invalid Credentials'})
      }
      const isPasswordValid = await bcrypt.compare(password,user.password)
      if(!isPasswordValid){
          
          return res.status(401).json({error:'Invalid Credentials'})
      }

      const token = jwt.sign({userId:user._id},SECRETE_KEY,{expiresIn:'1hr'})
      res.json({message:'Login Succesful',id:user._id,token:token,Name:user.firstname,Mobile:user.mobile})
  }catch(error){
      res.status(500).json({error:'Error in logging '})
  }
})






// Add this route in server.js
app.post('/api/admin/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // For demonstration only - hardcoded credentials
      if (username === 'admin' && password === 'admin') {
        res.status(200).json({ message: 'Admin login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  




  // Add this route in server.js
const Food = require('./models/Food'); // Import your Food model

app.post('/api/admin/add-food', async (req, res) => {
  try {
    const { name, description, price, imgUrl } = req.body;

    // Create a new food item
    const newFood = new Food({
      name,
      description,
      price,
      imgUrl,
    });

    // Save the new food item to the database
    await newFood.save();

    res.status(201).json({ message: 'Food item added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.get('/api/foods', async (req, res) => {
  try {
    // Fetch all food items from the database
    const foods = await Food.find({});
    res.json(foods);
  } catch (error) {
    console.error('Error fetching food data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Middleware to parse JSON
app.use(bodyParser.json());

// Route to handle placing an order
app.post('/orders', async (req, res) => {
  try {
    const { userName,userMobile, itemName, amount, price } = req.body;

    // Create a new order
    const order = new Order({ userName,userMobile, itemName, amount, price });

    // Save the order to the database
    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Error placing order. Please try again.' });
  }
});




// API endpoint to get orders
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
    
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});



