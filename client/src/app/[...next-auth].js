import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/home", // on successfully signin
    signOut: "/home", // on signout redirects users to a custom login page.
    error: "/error", // displays authentication errors
    newUser: "/signup", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // first axios request to ascertain if our user exists in our custom DB
      const response = await axios.post("http://localhost:3000/login", {
        email: profile.email,
      });
      if (response && response.data?.value === true) {
        // user exists return true passing control to the next callback
        return true;
      } else {
        // second axios call which creates a new user in our database
        const data = {
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          profileUrl: profile.picture,
        };
        const response = await axios.post("http://localhost:3000/signup", data);
        // retruns true thereby passing control to the next callback
        return true;
      }
    },
    async jwt({ token, user, account }) {
      if (account) {
        console.log(user, token, account);
        // call the signToken function which returns a JWT token
        const token = await SignToken(user?.email);
        token.userToken = token;
      }
      // the token object is passed done to the session call back for persistence
      return token;
    },
  },
};

export default NextAuth(authOptions);
