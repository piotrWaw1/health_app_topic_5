import { ThemedText } from "@/components/ThemedText";
import { Stack } from "expo-router";
import ThemedSaveAreaView from "@/components/ThemedSaveAreaView";

export default function BloodSugarLevel(){
  return(
    <>
      <Stack.Screen options={{ title: 'Add blood sugar level' }}/>
      <ThemedSaveAreaView>
        <ThemedText>BloodSugarLevel</ThemedText>
      </ThemedSaveAreaView>
    </>
  )
}