require('dotenv').config()
const express = require('express')
const cors = require('cors')
const passport = require("passport");
require('./passportConfig')(passport)


const app = express()

app.use(cors())
app.use(passport.initialize());

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
  // res.redirect("/profile/");
  }
 );
// profile route after successful sign inem> 
 app.get("/profile", (req, res) => {
  res.send("Welcome");
 });

app.listen(8080, ()=> console.log('Server run on 8080'))

