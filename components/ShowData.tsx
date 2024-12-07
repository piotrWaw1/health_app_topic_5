import { ThemedText } from "@/components/ThemedText";
import { Pressable, StyleProp, TextStyle, View } from "react-native";
import { format } from "date-fns";
import { ItemType, useStorageContext } from "@/context/StorageContext";
import React, { ReactNode } from "react";
import { cn } from "@/components/utils/cn";
import * as SecureStore from "expo-secure-store";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

interface ShowDataProps {
  data: null | ItemType[];
  title: ReactNode;
  containerClass?: string;
  titleClass?: string;
  style?: StyleProp<TextStyle>;
  keyItem: string;
}

export default function ShowData(props: ShowDataProps) {
  const { data, title, containerClass, titleClass, style, keyItem } = props
  const { fetchData } = useStorageContext()

  const deleteItem = async (key: string, itemId: number) => {
    const finalData = itemId === 0 ? null : data?.splice(itemId);
    await SecureStore.setItemAsync(key, JSON.stringify(finalData));
    fetchData();
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
            <Pressable className="bg-white/70 p-2 rounded-xl" onPress={() => deleteItem(keyItem, index)}>
              <TabBarIcon name='trash'/>
            </Pressable>
          </View>
        )) || <ThemedText className="p-2" style={style}>No data</ThemedText>
      }
    </View>
  )
}