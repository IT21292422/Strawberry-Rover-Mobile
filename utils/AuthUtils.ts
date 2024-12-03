import { auth } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { saveToken, getToken, removeToken } from "./SecureStoreUtils";

export const signUp = async (
  email: string,
  password: string,
  rememberMe: boolean
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();
    if (rememberMe) {
      await saveToken("authToken", token);
    }
    console.log("User signed up and token stored successfully");
  } catch (error) {
    console.error("Error signing up: ", error);
  }
};

export const login = async (
  email: string,
  password: string,
  rememberMe?: string
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();
    if (rememberMe) {
      await saveToken("authToken", token);
    }
    console.log("User logged in and token stored");
  } catch (error) {
    console.error("Error logging in: ", error);
  }
};

export const authenticateUser = async () => {
  const token = await getToken("authToken");
  if (token) {
    //TODO Authenticate User
    console.log("User is authenticated with token: ", token);
  } else {
    //Redirect to login screen
    console.log("No token found, redirecting to login");
  }
};

export const logout = async () => {
  //TODO Logout User
  await removeToken("authToken");
  console.log("User logged out and token removed");
};
