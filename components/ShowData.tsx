import { ThemedText } from "@/components/ThemedText";
import { View } from "react-native";
import { format } from "date-fns";
import { ItemType } from "@/context/StorageContext";
import { ReactNode } from "react";

interface ShowDataProps {
  data: null | ItemType[];
  title: ReactNode
}

export default function ShowData(props: ShowDataProps) {
  const { data, title } = props
  return (
    <View>
      <ThemedText type="title">{title}</ThemedText>
      {
        data?.map((item, index) => (
          <View key={index}>
            <ThemedText>Value: {item.value}</ThemedText>
            <ThemedText>Date: {format(item.date, "dd-MM-yyyy HH:mm")}</ThemedText>
          </View>
        )) || <ThemedText>No data</ThemedText>
      }
    </View>
  )
}