const passport = require("passport")
const TwitterStrategy = require("passport-twitter").Strategy
const User = require("../models/User")

passport.serializeUser((user, done) => {
  done(null, user.id)
})

// deserialize the cookieUserId to user in the database
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user)
    })
    .catch((e) => {
      done(new Error("Failed to deserialize an user"))
    })
})

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_API_KEY,
      consumerSecret: process.env.TWITTER_SECRET_KEY,
      callbackURL: "/api/auth/twitter/redirect",
    },
    async (token, tokenSecret, profile, done) => {
      // find current user in UserModel
      const currentUser = await User.findOne({
        twitterId: profile._json.id_str,
      })
      // create new user if the database doesn't have this user
      if (!currentUser) {
        const newUser = await new User({
          name: profile._json.name,
          screenName: profile._json.screen_name,
          twitterId: profile._json.id_str,
          profileImageUrl: profile._json.profile_image_url,
        }).save()
        if (newUser) {
          done(null, newUser)
        }
      }
      done(null, currentUser)
    }
  )
)

module.exports = passport
