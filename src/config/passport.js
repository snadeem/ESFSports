import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import models from '../models'

const Users = models.User;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

console.log("inside passport");
//opts.jwtFromRequest = ExtractJwt.fromHeader("authorization");
//opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
opts.secretOrKey = 'secret123';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

// create jwt strategy
module.exports = passport => {
  passport.use(
      new JwtStrategy(opts, (jwt_payload, done) => {
          console.log('payload received', jwt_payload);
      Users.findAll({ where: { id: jwt_payload.id } })
        .then(user => {
          if (user.length) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
