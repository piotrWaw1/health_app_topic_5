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
      <SafeAreaView className="gap-4">
        <ShowData
          data={bloodPressure}
          title="Blood pressure"
          containerClass={"bg-red-600/70"}
          titleClass={"bg-red-600"}
          style={{ color: "white" }}
        />
        <ShowData
          data={bloodOxygenLevel}
          title="Blood oxygen"
          containerClass={"bg-blue-600/70"}
          titleClass={"bg-blue-600"}
          style={{ color: "white" }}
        />
        <ShowData
          data={bloodSugarLevel}
          title="Blood sugar"
          containerClass={"bg-orange-600/70"}
          titleClass={"bg-orange-600"}
          style={{ color: "white" }}
        />
        <ShowData
          data={weight}
          title="Weight"
          containerClass={"bg-green-600/70"}
          titleClass={"bg-green-600"}
          style={{ color: "white" }}
        />
      </SafeAreaView>
    </ParallaxScrollView>
  )
}
