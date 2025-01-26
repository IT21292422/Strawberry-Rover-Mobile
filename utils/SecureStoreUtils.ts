import * as SecureStore from "expo-secure-store";

export const saveItem = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
    console.log("Token saved successfully");
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

export const getItem = async (key: string) => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

export const removeItem = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error("Error removing token:", error);
  }
};
