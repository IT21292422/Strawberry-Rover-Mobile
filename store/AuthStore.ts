import { create } from "zustand";
import { getToken, saveToken, removeToken } from "@/utils/SecureStoreUtils";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";

const useAuthStore = create((set) => ({
  user: null,
  initializeUser: async () => {
    const token = await getToken("authToken");
    if (token) {
      set({ user: { token } });
    }
  },
  signIn: async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();
    await saveToken("authToken", token);
    set({ user: { token } });
  },
  signOut: async () => {
    await auth.signOut();
    await removeToken("authToken");
    set({ user: null });
  },
}));

export default useAuthStore;
