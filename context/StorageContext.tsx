import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataKeys } from "@/types/DataKeys";
import * as SecureStore from 'expo-secure-store';

export interface ItemType {
  value: number;
  date: Date;
}

type StorageContextData = {
  bloodOxygenLevel: null | ItemType[];
  bloodPressure: null | ItemType[];
  bloodSugarLevel: null | ItemType[];
  weight: null | ItemType[];
  setItem: (key: DataKeys, item: ItemType) => void;
  fetchData: () => void;
}

const initState: StorageContextData = {
  bloodOxygenLevel: null,
  bloodPressure: null,
  bloodSugarLevel: null,
  weight: null,
  setItem: async () => undefined,
  fetchData: async () => undefined,
}

export const clear = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};

// SecureStore.deleteItemAsync(DataKeys.weight).then()
// SecureStore.deleteItemAsync(DataKeys.bloodPressure).then()
// SecureStore.deleteItemAsync(DataKeys.bloodSugarLevel).then()
// SecureStore.deleteItemAsync(DataKeys.bloodOxygenLevel).then()

const StorageContext = createContext<StorageContextData>(initState);
export const useStorageContext = () => useContext(StorageContext);

export const StorageProvider = ({ children }: { children: ReactNode }) => {

  const [bloodOxygenLevel, setBloodOxygenLevel] = useState<null | ItemType[]>(null);
  const [bloodPressure, setBloodPressure] = useState<null | ItemType[]>(null);
  const [bloodSugarLevel, setBloodSugarLevel] = useState<null | ItemType[]>(null);
  const [weight, setWeight] = useState<null | ItemType[]>(null);

  const fetchData = async () => {
    try {
      const oxygenLevel = await SecureStore.getItemAsync("bloodOxygenLevel");
      const pressure = await SecureStore.getItemAsync("bloodPressure");
      const sugarLevel = await SecureStore.getItemAsync("bloodSugarLevel");
      const userWeight = await SecureStore.getItemAsync("weight");

      setBloodOxygenLevel(oxygenLevel ? JSON.parse(oxygenLevel) : null);
      setBloodPressure(pressure ? JSON.parse(pressure) : null);
      setBloodSugarLevel(sugarLevel ? JSON.parse(sugarLevel) : null);
      setWeight(userWeight ? JSON.parse(userWeight) : null);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
    bloodOxygenLevel,
    bloodPressure,
    bloodSugarLevel,
    weight,
    setItem,
    fetchData,
  }

  return (
    <StorageContext.Provider value={contextData}>
      {children}
    </StorageContext.Provider>
  )
}
