import { auth } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { saveItem, removeItem } from "./SecureStoreUtils";
import { Alert } from "react-native";
import { router } from "expo-router";

export const signUp = async (
  username: string,
  email: string,
  password: string,
  rememberMe: boolean,
  setUser: (user: any) => void
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await updateProfile(user, { displayName: username });
    const token = await user.getIdToken();
    if (rememberMe) {
      await saveItem("authToken", token);
    }
    setUser(userCredential.user);
    console.log(user);
    console.log("User signed up and token stored successfully");
  } catch (error: any) {
    const errorMessage =
      error.code === "auth/email-already-in-use"
        ? "The email is already registered."
        : error.code === "auth/weak-password"
        ? "Password is too weak."
        : "An error occurred.";
    console.error(errorMessage, error);
    Alert.alert("Sign-Up Error", errorMessage);
    console.error("Error signing up: ", error);
  }
};

export const login = async (
  email: string,
  password: string,
  rememberMe: boolean,
  setUser: (user: any) => void
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();
    if (rememberMe) {
      await saveItem("authToken", token);
    }
    setUser(userCredential.user);
    console.log("User logged in and token stored");
  } catch (error) {
    console.error("Error logging in: ", error);
  }
};

export const initializeAuth = (setUser: (user: any) => void) => {
  onAuthStateChanged(auth, (user) => {
    console.log("USER: " + user + " " + user?.email);
    if (user) {
      setUser(user);
      router.replace("/home");
    } else {
      router.replace("/signin");
    }
  });
};

export const logout = async (setUser: (user: any) => void) => {
  try {
    await auth.signOut();
    await removeItem("authToken");
    setUser(null);
    console.log("User logged out and token removed");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
