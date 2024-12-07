import { ThemedText } from "@/components/ThemedText";
import { StyleProp, TextStyle, View } from "react-native";
import { format } from "date-fns";
import { ItemType } from "@/context/StorageContext";
import { ReactNode } from "react";
import { cn } from "@/components/utils/cn";

interface ShowDataProps {
  data: null | ItemType[];
  title: ReactNode
  containerClass?: string
  titleClass?: string
  style?: StyleProp<TextStyle>
}

export default function ShowData(props: ShowDataProps) {
  const { data, title, containerClass, titleClass, style } = props
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
          <View  key={index} className="p-2">
            <ThemedText style={style}>Date: {format(item.date, "dd-MM-yyyy HH:mm")}</ThemedText>
            <ThemedText style={style}>Value: {item.value}</ThemedText>
          </View>
        )) || <ThemedText className="p-2" style={style}>No data</ThemedText>
      }
    </View>
  )
}