// import NextAuth from "next-auth/next";
// import GoogleProvider from "next-auth/providers/google";
// import connectToDB from "@utils/database";
// import User from "@models/user";
// import { models } from "mongoose";
// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     async session({ session }) {
//       const sessionUser = await User.findOne({
//         email: session.user.email,
//       });
//       session.user.id = sessionUser._id.toString();
//       return session;
//     },
//     async signIn({ profile }) {
//       try {
//         await connectToDB();
//         // check, if a user already exists
//         const userExists = await User.findOne({
//           email: profile.email,
//         });
//         // if not, create new user and save it database
//         if (!userExists) {
//           await User.create({
//             email: profile.email,
//             username: profile.name.replace(" ", "").toLowerCase(),
//             image: profile.picture,
//           });
//         }
//         return true;
//       } catch (error) {
//         console.log(error);
//         return false;
//       }
//     },
//   },
// });
// export { handler as GET, handler as POST };
// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      console.log("Connecting to DB for session...");
      await connectToDB();
      console.log("Connected to DB for session.");
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      console.log("Connecting to DB for signIn...");
      try {
        await connectToDB();
        console.log("Connected to DB for signIn.");
        // check if a user already exists
        const userExists = await User.findOne({
          email: profile.email,
        });
        // if not, create new user and save it to the database
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log("Error during signIn:", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
