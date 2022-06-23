const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { GoogleUser } = require("./models");


const strategyConfig = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:8080/auth/google/callback",
  passReqToCallback: true,
}

const checkAuthen = async (request, accessToken, refreshToken, profile, done) => {
  try {
    console.log(profile.displayName)
    let existingUser = await GoogleUser.findOne({where :{ email: profile.email }});
   // if user exists return the user
   if (existingUser) {
     return done(null, existingUser);
   }
   // if user does not exist create a new user
   console.log("Creating new user...");
   const newUser =  {
       //  id: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
   }
   await GoogleUser.create(newUser)
   return done(null, newUser);
 } catch (error) {
   return done(error, false);
 }
}

const strategy = new GoogleStrategy(strategyConfig, checkAuthen);


module.exports = (passport) => {
  passport.use(strategy)
}


