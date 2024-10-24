import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { TextInput } from "react-native";

export default function AddMeasurement() {
  return (
    <ParallaxScrollView>
      <SafeAreaView>
        <TextInput/>
        <ThemedText>3 last records</ThemedText>
      </SafeAreaView>
    </ParallaxScrollView>
  )
}