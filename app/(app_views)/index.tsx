import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MainScreen() {
  return (
    <ParallaxScrollView>
      <SafeAreaView>
        <ThemedText>3 last records</ThemedText>
        <ThemedText>Chart</ThemedText>
      </SafeAreaView>
    </ParallaxScrollView>
  )
}
