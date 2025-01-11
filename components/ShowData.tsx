import { ThemedText } from "@/components/ThemedText";
import { Pressable, StyleProp, TextStyle, View } from "react-native";
import { format } from "date-fns";
import { ItemType, useStorageContext } from "@/context/StorageContext";
import React, { ReactNode, useCallback, useState } from "react";
import { cn } from "@/components/utils/cn";
import * as SecureStore from "expo-secure-store";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import axios from "axios";
import { DataKeys } from "@/types/DataKeys";
import { useFocusEffect } from "expo-router";
import { useSessionContext } from "@/context/SessionContext";
import * as Notifications from 'expo-notifications';

interface ShowDataProps {
  data: null | ItemType[];
  title: ReactNode;
  containerClass?: string;
  titleClass?: string;
  style?: StyleProp<TextStyle>;
  keyItem: DataKeys;
  endpoint: string;
}

interface ServerData {
  blood_pressure?: string;
  blood_oxygen?: string;
  blood_sugar?: string;
  weight?: string;
  date: Date;
  id: number;
  user_id: number;
}

export default function ShowData(props: ShowDataProps) {
  const { data, title, containerClass, titleClass, style, keyItem, endpoint } = props
  const { fetchData, setItem } = useStorageContext()
  const [downloadedData, setDownloadedData] = useState<ServerData[]>()
  const { token } = useSessionContext()

  const deleteItem = async (key: string, itemId: number) => {
    if (data) {
      const copy = [...data]
      const itemToDelete = copy?.splice(itemId, 1)[0]
      if (copy.length >= 1) {
        await SecureStore.setItemAsync(key, JSON.stringify(copy));
      } else {
        await SecureStore.deleteItemAsync(key);
      }
    }
    showNotification().then();
    fetchData();
  }

  const getData = async () => {
    try {
      const { data } = await axios.get<ServerData[]>(endpoint);
      setDownloadedData(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  }

  const showNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Deleted!',
        body: 'Item deleted!',
        data: { someData: 'Some data' },
      },
      trigger: null, // Immediate notification
    });
  };

  useFocusEffect(
    useCallback(() => {
      if (token) {
        getData().then();
      } else {
        setDownloadedData(undefined)
      }
    }, [token, endpoint]) // Dependencies that should trigger a re-fetch
  );

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
      getData().then()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
      }
    } finally {
      fetchData();
    }
  }

  const deleteItemOnline = async (endpoint: string, itemId: number) => {
    try {
      await axios.delete(`${endpoint}/${itemId}`)
      getData().then()
      showNotification().then();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
      }
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
              {!item.id && token &&
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

      {downloadedData?.length &&
          <View>
              <ThemedText>Downloaded data</ThemedText>
            {downloadedData?.map((item, index) => (
              <View key={index} className="p-2 flex flex-row justify-between items-center">
                <View>
                  <ThemedText style={style}>Date: {format(item.date, "dd-MM-yyyy HH:mm")}</ThemedText>
                  <ThemedText
                    style={style}>Value: {item.blood_pressure || item.blood_oxygen || item.blood_sugar || item.weight}</ThemedText>
                </View>
                <View className="flex flex-row gap-2">
                  <Pressable className="bg-white/70 p-2 rounded-xl" onPress={() => deleteItemOnline(endpoint, item.id)}>
                    <TabBarIcon name='trash'/>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        || null}
    </View>
  )
}