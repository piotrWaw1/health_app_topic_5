import { ThemedText } from "@/components/ThemedText";
import { Stack } from "expo-router";
import ThemedSaveAreaView from "@/components/ThemedSaveAreaView";

export default function BloodOxygenLevel(){
  return(
    <>
      <Stack.Screen options={{ title: 'Add blood oxygen level' }}/>
      <ThemedSaveAreaView>
        <ThemedText>BloodOxygenLevel</ThemedText>
      </ThemedSaveAreaView>
    </>
  )
}