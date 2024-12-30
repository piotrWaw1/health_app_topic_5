import { ThemedText } from "@/components/ThemedText";
import { Pressable, StyleProp, TextStyle, View } from "react-native";
import { format } from "date-fns";
import { ItemType, useStorageContext } from "@/context/StorageContext";
import React, { ReactNode } from "react";
import { cn } from "@/components/utils/cn";
import * as SecureStore from "expo-secure-store";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import axios from "axios";
import { DataKeys } from "@/types/DataKeys";

interface ShowDataProps {
  data: null | ItemType[];
  title: ReactNode;
  containerClass?: string;
  titleClass?: string;
  style?: StyleProp<TextStyle>;
  keyItem: DataKeys;
  endpoint: string;
}

export default function ShowData(props: ShowDataProps) {
  const { data, title, containerClass, titleClass, style, keyItem, endpoint } = props
  const { fetchData, setItem } = useStorageContext()

  const deleteItem = async (key: string, itemId: number) => {
    if (data) {
      const copy = [...data]
      const itemToDelete = copy?.splice(itemId, 1)[0]
      if (copy.length >= 1) {
        await SecureStore.setItemAsync(key, JSON.stringify(copy));
        if (itemToDelete.id) {
          await axios.delete(`${endpoint}/${itemToDelete.id}`)
        }
      } else {
        await SecureStore.deleteItemAsync(key);
      }
    }
    fetchData();
  }

  const updateId = (serverId: number, itemId: number) => {
    if (data) {
      const item = data[itemId]
      setItem(keyItem, { ...item, id: serverId })
    }
  }

  const saveOnline = async (item: ItemType, itemId: number) => {
    try {
      const { data } = await axios.post(endpoint, item)
      updateId(data.id, itemId)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
      }
    } finally {
      fetchData();
    }
  }

  return (
    <View className={cn("rounded-xl", containerClass)}>
      <ThemedText
        className={cn("rounded-xl p-2", titleClass)}
        style={style}
        type="title"
      >
        {title}
      </ThemedText>
      {
        data?.map((item, index) => (
          <View key={index} className="p-2 flex flex-row justify-between items-center">
            <View>
              <ThemedText style={style}>Date: {format(item.date, "dd-MM-yyyy HH:mm")}</ThemedText>
              <ThemedText style={style}>Value: {item.value}</ThemedText>
            </View>
            <View className="flex flex-row gap-2">
              {!item.id &&
                  <Pressable className="bg-white/70 p-2 rounded-xl" onPress={() => saveOnline(item, index)}>
                      <TabBarIcon name='send'/>
                  </Pressable>
              }
              {item.id &&
                  <ThemedText>Saved</ThemedText>
              }
              <Pressable className="bg-white/70 p-2 rounded-xl" onPress={() => deleteItem(keyItem, index)}>
                <TabBarIcon name='trash'/>
              </Pressable>
            </View>
          </View>
        )) || <ThemedText className="p-2" style={style}>No data</ThemedText>
      }
    </View>
  )
}