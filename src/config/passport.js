import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from "../models/users.js";


passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      // Match Email's User
      const user = await User.findOne({ email: email });

      if (!user) {
        return done(null, false, { message: "Este usuario no existe" });
      }

      // Match Password's User
      const isMatch = await user.matchPassword(password);
      if (!isMatch)
        return done(null, false, { message: "password incorrecta." });
      
      return done(null, user);
    }
  )
);

// Configura la estrategia de autenticación JWT
const opcionesJwt = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

passport.use(
  new JwtStrategy(opcionesJwt, async (payload, done) => {
    try {
      // Busca el usuario en la base de datos
      const user = await User.findById(payload.sub);

      // Si el usuario no existe, retorna un error
      if (!user) {
        return done(null, false, { message: 'Usuario no encontrado' });
      }

      // Si el usuario existe, retorna el usuario
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);












passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      id: user.id,
      name: user.name
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});