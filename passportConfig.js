const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { GoogleUser } = require("./models");

// GoogleUser.findByPk(2).then(res => console.log(res))
// GoogleUser.findOne({where: {email : 'danny@ggmail.com'}}).then(res => console.log(res))
const checkAuthen = async (request, accessToken, refreshToken, profile, done) => {
  console.log(profile.email)
  console.log(accessToken)
  let existingUser = await GoogleUser.findOne({where : { email : profile.email }});
  try {
    // let xxx = await GoogleUser.findAll()
    return( done(null, profile.displayName))
  }catch(err) {
    return done(error, false)
  }

}

const strategy = new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:8080/auth/google/callback",
  passReqToCallback: true,
}, checkAuthen);


// module.exports = (passport) => {
//   passport.use(strategy)
// }

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
      passReqToCallback: true,
    },
     async (request, accessToken, refreshToken, profile, done) => {
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
  ))
}
