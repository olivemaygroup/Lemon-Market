import { useRouter } from "next/router";

const authRouter = () => {
  console.log('USER unauthenticated YET TO BE FIXED ON THE FRONT END - we need to create global boolean state to track this')
};

const handleAuthenticationError = () => {
  authRouter();
  console.error("User not authenticated");
  return undefined
};

export default handleAuthenticationError;
