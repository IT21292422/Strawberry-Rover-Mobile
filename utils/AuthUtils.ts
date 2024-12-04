import { auth } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { saveToken, getToken, removeToken } from "./SecureStoreUtils";
import useAuthStore from "@/store/AuthStore";

export const signUp = async (
  username: string,
  email: string,
  password: string,
  rememberMe: boolean
) => {
  try {
    const setUser = useAuthStore((state) => state.setUser);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await updateProfile(user, { displayName: username });
    const token = await user.getIdToken();
    if (rememberMe) {
      await saveToken("authToken", token);
    }
    setUser(userCredential.user);
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
    const setUser = useAuthStore((state) => state.setUser);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();
    if (rememberMe) {
      await saveToken("authToken", token);
    }
    setUser(userCredential.user);
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
  const setUser = useAuthStore((state) => state.setUser);
  await auth.signOut();
  await removeToken("authToken");
  setUser(null);
  console.log("User logged out and token removed");
};
