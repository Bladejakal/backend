const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'pa$$w0rd';

const jwtStrategy = new JwtStrategy(opts, (payload, done) => {
        if (payload.name !== 'John') {
            return done(new Error('login first'), null);
        }

        return done(null, payload);
    }
);

passport.use('jwt', jwtStrategy);

export const authenticate = passport.authenticate('jwt', {session: false});
