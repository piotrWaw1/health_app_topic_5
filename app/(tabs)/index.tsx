import ParallaxScrollView from "@/components/ParallaxScrollView";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, } from "react";
import { useFocusEffect } from "expo-router";
import { useStorageContext } from "@/context/StorageContext";
import ShowData from "@/components/ShowData";

export default function MainScreen() {

  const { bloodPressure, bloodOxygenLevel, bloodSugarLevel, weight, fetchData } = useStorageContext()

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <ParallaxScrollView>
      <SafeAreaView className="gap-4">
        <ShowData
          keyItem="bloodPressure"
          data={bloodPressure}
          title="Blood pressure"
          containerClass={"bg-red-600/70"}
          titleClass={"bg-red-600"}
          style={{ color: "white" }}
        />
        <ShowData
          keyItem="bloodOxygenLevel"
          data={bloodOxygenLevel}
          title="Blood oxygen"
          containerClass={"bg-blue-600/70"}
          titleClass={"bg-blue-600"}
          style={{ color: "white" }}
        />
        <ShowData
          keyItem="bloodSugarLevel"
          data={bloodSugarLevel}
          title="Blood sugar"
          containerClass={"bg-orange-600/70"}
          titleClass={"bg-orange-600"}
          style={{ color: "white" }}
        />
        <ShowData
          keyItem="weight"
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
