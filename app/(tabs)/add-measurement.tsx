import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { View } from "react-native";
import { cn } from "@/components/utils/cn";

const defaultClassLink = "text-white text-center p-2 rounded-xl font-bold text-lg"

export default function AddMeasurement() {

  return (
    <SafeAreaView className="flex justify-center px-14 h-full bg-white">
      <ThemedText type="title">Add measurement</ThemedText>
      <View className="gap-4 mt-5">
        <Link className={cn(defaultClassLink, "bg-red-600")} href="/add-measurement/blood-pressure">
          Blood pressure
        </Link>
        <Link className={cn(defaultClassLink, "bg-blue-600")} href="/add-measurement/blood-oxygen-level">
          Blood oxygen level
        </Link>
        <Link className={cn(defaultClassLink, "bg-orange-600")} href="/add-measurement/blood-sugar-level">
          Blood sugar level
        </Link>
        <Link className={cn(defaultClassLink, "bg-green-600")} href="/add-measurement/Weight">
          Weight
        </Link>
      </View>
    </SafeAreaView>
  )
}