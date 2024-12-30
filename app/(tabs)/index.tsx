import ParallaxScrollView from "@/components/ParallaxScrollView";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, } from "react";
import { useFocusEffect } from "expo-router";
import { useStorageContext } from "@/context/StorageContext";
import ShowData from "@/components/ShowData";
import { DataKeys } from "@/types/DataKeys";

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
          keyItem={DataKeys.bloodPressure}
          data={bloodPressure}
          title="Blood pressure"
          containerClass={"bg-red-600/70"}
          titleClass={"bg-red-600"}
          style={{ color: "white" }}
          endpoint="/blood-pressure"
        />
        <ShowData
          keyItem={DataKeys.bloodOxygenLevel}
          data={bloodOxygenLevel}
          title="Blood oxygen"
          containerClass={"bg-blue-600/70"}
          titleClass={"bg-blue-600"}
          style={{ color: "white" }}
          endpoint="/blood-oxygen"
        />
        <ShowData
          keyItem={DataKeys.bloodSugarLevel}
          data={bloodSugarLevel}
          title="Blood sugar"
          containerClass={"bg-orange-600/70"}
          titleClass={"bg-orange-600"}
          style={{ color: "white" }}
          endpoint="/blood-sugar"
        />
        <ShowData
          keyItem={DataKeys.weight}
          data={weight}
          title="Weight"
          containerClass={"bg-green-600/70"}
          titleClass={"bg-green-600"}
          style={{ color: "white" }}
          endpoint="/weight"
        />
      </SafeAreaView>
    </ParallaxScrollView>
  )
}
