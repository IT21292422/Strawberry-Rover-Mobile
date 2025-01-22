import { auth } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { saveItem, removeItem, getItem } from "./SecureStoreUtils";
import { Alert } from "react-native";
import { router } from "expo-router";

export const signUp = async (
  username: string,
  email: string,
  password: string,
  rememberMe: boolean,
  setUser: (user: User) => void
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  await updateProfile(user, { displayName: username });
  const token = await user.getIdToken();
  console.log("Token: " + token);
  if (rememberMe) {
    await saveItem("authToken", token);
    console.log("Token Saved Successfully");
  }
  setUser(userCredential.user);
  console.log(user);
  console.log("User signed up successfully");
};

export const login = async (
  email: string,
  password: string,
  rememberMe: boolean,
  setUser: (user: User) => void
) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const token = await userCredential.user.getIdToken();
  if (rememberMe) {
    await saveItem("authToken", token);
    console.log("Token Saved Successfully");
  }
  setUser(userCredential.user);
  console.log("User logged in successfully");
};

export const initializeAuth = async (setUser: (user: User | null) => void) => {
  try {
    const savedToken = await getItem("authToken");
    if (savedToken) {
      console.log("Token found in secure storage...");
      onAuthStateChanged(auth, (user) => {
        console.log("USER: " + user + " " + user?.email);
        if (user) {
          console.log("User authenticated via token.");
          setUser(user);
          router.replace("/home");
        } else {
          console.log("User token expired or invalid.");
          setUser(null);
          router.replace("/signin");
        }
      });
    } else {
      console.log("No token found. Redirecting to sign-in...");
      router.replace("/signin");
    }
  } catch (error) {
    console.error("Error during initialization:", error);
    router.replace("/signin");
  }
};

export const logout = async (setUser: (user: User | null) => void) => {
  try {
    await auth.signOut();
    await removeItem("authToken");
    setUser(null);
    router.replace("/signin");
    console.log("User logged out and token removed");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
