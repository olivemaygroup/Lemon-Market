import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { changeAuthStatus } from "@/lib/features/authentication/authSlice";



const handleAuthenticationError = () => {
  const dispatch = useDispatch();
  dispatch(changeAuthStatus(false))
  console.error("User not authenticated");
  return undefined
};

export default handleAuthenticationError;
