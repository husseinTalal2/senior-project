import AsyncStorage from "@react-native-async-storage/async-storage";

export function useLocalStorage() {
  return { set: AsyncStorage.setItem, get: AsyncStorage.getItem };
}
