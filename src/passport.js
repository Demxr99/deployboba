const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('./models/user');

// set up passport configs
passport.use(new GoogleStrategy({
  clientID: '751838639139-b1rvgmp2jb8aie3oenicj8lusaa4e23q.apps.googleusercontent.com',
  clientSecret: 'Xy7qQbCi5kUTXs4B2p1A3ZEK',
  callbackURL: '/auth/google/callback'
}, function(accessToken, refreshToken, profile, done) {
  User.findOne({
    'googleid': profile.id
  }, function(err, user) {
    if (err) return done(err);

    if (!user) {
      const user = new User({
        name: profile.displayName,
        googleid: profile.id,
        points:0,
        status: "Boba Newbie"
      });

      user.save(function(err) {
        if (err) console.log(err);

        return done(err, user);
      });
    } else {
      return done(err, user);
    }
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

module.exports = passport;
