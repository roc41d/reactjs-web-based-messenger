const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require("../models/user");

const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

const passportJWTstrategy = new JWTstrategy(options, async (jwtPayload, done) => {
  const username = jwtPayload.userName;
  User.findOne({ userName: username }, (error, user) => {
    if (error) {
      return done(error, false);
    } else {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    }
  });
});

passport.use(process.env.JWT_SCHEME, passportJWTstrategy);