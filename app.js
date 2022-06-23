require('dotenv').config()
const express = require('express')
const cors = require('cors')
const passport = require("passport");
require('./passportConfig')(passport)


const app = express()

app.use(cors())

// Redirect the user to the Google signin page 
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
 );
 // Retrieve user data using the access token received 
 app.get(
  "/auth/google/callback",
  passport.authenticate('google', { session: false }),
  (req, res) => {
    console.log(req.user);
    res.send("Welcome  " + req.user.email)
  }
 );

let port = process.env.PORT
app.listen(port, ()=> console.log('Server run on port:', port))

