import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectToDatabase from "./lib/db";
import User from "./models/User";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // Login logic happens here
      authorize: async (credentials) => {
        try {
          await connectToDatabase();
          
          //Find user by email and explicitly INCLUDE the password (select: '+password')
          const user = await User.findOne({ email: credentials.email }).select("+password");

          if (!user) {
            console.log("User not found");
            return null; // Returning null means login failed
          }

          // Verify password
          // If the DB password isn't hashed (e.g., manual creation), use direct comparison
          // But using bcrypt is the standard:
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordValid) {
            console.log("Invalid password");
            return null;
          }

          //If successful, return the user object (excluding the password)
          return { 
            id: user._id.toString(), 
            name: user.name, 
            email: user.email, 
            role: user.role,
            image: user.image
          };

        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        await connectToDatabase();
        try {
          // Check if user exists; if not, create one
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              role: "user", // Default is a standard user
              password: "", // Google accounts don't need a password
            });
          }
          return true;
        } catch (error) {
          console.error("Error saving Google user:", error);
          return false;
        }
      }
      return true; // Allow password-based logins to proceed
    },
    // This callback runs right after a successful login.
    // We inject the ROLE into the JWT token here.
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    // This runs when the client-side requests session data
    // We pass the token's ROLE to the visible session
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Redirect here on error or protected route access
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET, // Ensure this is set in .env
});