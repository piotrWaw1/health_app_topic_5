import { createContext, useContext } from "react";
import { ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataKeys } from "@/types/DataKeys";

interface ItemType {
  value: number;
  date: Date;
}

type StorageContextData = {
  setItem: (key: DataKeys, item: ItemType) => void;
  getAllItems: () => void;
}

const initState: StorageContextData = {
  setItem: async () => undefined,
  getAllItems: async () => undefined,
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
      const data = await AsyncStorage.getItem(key);
      if (data) {
        const parse_data: ItemType[] = JSON.parse(data);
        const index = parse_data.findIndex(i => new Date(i.date).getTime() === new Date(item.date).getTime());

        if (index !== -1) {
          parse_data[index].value = item.value;
        } else {
          parse_data.push(item);
        }

        await AsyncStorage.setItem(key, JSON.stringify(parse_data));
      } else {
        const itemToSave = [item]
        await AsyncStorage.setItem(key, JSON.stringify(itemToSave));
      }
    } catch (error) {
      console.error('Error getting item:', error);
    }
  }

  const getAllItems = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      const allItems = items.reduce((accumulator: Record<string, any>, [key, value]) => {
        accumulator[key] = value;
        return accumulator;
      }, {})
      console.log(allItems)
    } catch (error) {
      console.error('Error getting all items:', error);
    }
  };

  const contextData: StorageContextData = {
    setItem,
    getAllItems
  }

  return (
    <StorageContext.Provider value={contextData}>
      {children}
    </StorageContext.Provider>
  )
}
