import ParallaxScrollView from "@/components/ParallaxScrollView";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "expo-router";
import { ItemType } from "@/context/StorageContext";
import ShowData from "@/components/ShowData";

export default function MainScreen() {

  const [bloodOxygenLevel, setBloodOxygenLevel] = useState<null | ItemType[]>(null);
  const [bloodPressure, setBloodPressure] = useState<null | ItemType[]>(null);
  const [bloodSugarLevel, setBloodSugarLevel] = useState<null | ItemType[]>(null);
  const [weight, setWeight] = useState<null | ItemType[]>(null);

  const fetchData = async () => {
    try {
      const oxygenLevel = await SecureStore.getItemAsync("bloodOxygenLevel");
      const pressure = await SecureStore.getItemAsync("bloodPressure");
      const sugarLevel = await SecureStore.getItemAsync("bloodSugarLevel");
      const userWeight = await SecureStore.getItemAsync("weight");

      setBloodOxygenLevel(oxygenLevel ? JSON.parse(oxygenLevel) : null);
      setBloodPressure(pressure ? JSON.parse(pressure) : null);
      setBloodSugarLevel(sugarLevel ? JSON.parse(sugarLevel) : null);
      setWeight(userWeight ? JSON.parse(userWeight) : null);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData().then();
    }, [])
  );

  // SecureStore.deleteItemAsync(DataKeys.weight).then()
  // SecureStore.deleteItemAsync(DataKeys.bloodPressure).then()
  // SecureStore.deleteItemAsync(DataKeys.bloodSugarLevel).then()
  // SecureStore.deleteItemAsync(DataKeys.bloodOxygenLevel).then()

  return (
    <ParallaxScrollView>
      <SafeAreaView>
        <ShowData data={bloodOxygenLevel} title="Blood oxygen"/>
        <ShowData data={bloodPressure} title="bloodPressure"/>
        <ShowData data={bloodSugarLevel} title="Blood sugar"/>
        <ShowData data={weight} title="Weight"/>
      </SafeAreaView>
    </ParallaxScrollView>
  )
}
