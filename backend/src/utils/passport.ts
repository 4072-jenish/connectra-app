import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import userService from "../services/authService";

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email: string, password: string, done) => {
      try {
        const user = await userService.getUserByEmail(email);

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          return done(null, false, { message: "Invalid password" });
        }

        return done(null, user);
      } catch (error) {
        return done(error as Error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await userService.getUserById(id);
    done(null, user);
  } catch (error) {
    done(error as Error);
  }
});

export default passport;