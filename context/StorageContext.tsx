import { createContext, useContext } from "react";
import { ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataKeys } from "@/types/DataKeys";
import * as SecureStore from 'expo-secure-store';

export interface ItemType {
  value: number;
  date: Date;
}

type StorageContextData = {
  setItem: (key: DataKeys, item: ItemType) => void;
}

const initState: StorageContextData = {
  setItem: async () => undefined,
}

export const clear = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};

const StorageContext = createContext<StorageContextData>(initState);
export const useStorageContext = () => useContext(StorageContext);

export const StorageProvider = ({ children }: { children: ReactNode }) => {

  const setItem = async (key: DataKeys, item: ItemType) => {
    try {
      const data = await SecureStore.getItemAsync(key);
      if (data) {
        const parse_data: ItemType[] = JSON.parse(data);
        const index = parse_data.findIndex(i => new Date(i.date).getTime() === new Date(item.date).getTime());

        if (index !== -1) {
          parse_data[index].value = item.value;
        } else {
          parse_data.push(item);
        }

        await SecureStore.setItemAsync(key, JSON.stringify(parse_data));
      } else {
        const itemToSave = [item]
        await SecureStore.setItemAsync(key, JSON.stringify(itemToSave));
      }
    } catch (error) {
      console.error('Error setting item:', error);
    }
  }

  const contextData: StorageContextData = {
    setItem,
  }

  return (
    <StorageContext.Provider value={contextData}>
      {children}
    </StorageContext.Provider>
  )
}
