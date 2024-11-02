import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, View, Text, Pressable } from "react-native";
import { date, InferType, number, object } from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import NumberInput from "@/components/inputs/NumberInput";
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { format } from "date-fns";

const schema = object({
  bloodPressure: number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive('Blood pressure must be a positive number')
    .required('Blood pressure is required'),
  date: date().required(),
})

type BloodPressure = InferType<typeof schema>;

const defaultValues = { bloodPressure: undefined, date: new Date() };

export default function AddMeasurement() {
  const [showPicker, setShowPicker] = useState(false);

  const form = useForm<BloodPressure>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onTouched"
  })

  const onSubmit = (request: BloodPressure) => {
    console.log(request);
  }

  const onChange = (event: DateTimePickerEvent, date?: Date) => {
    const { type } = event
    if (type === "set") {
      if (date) {
        form.setValue("date", date)
      } else {
        form.setValue("date", new Date())
      }
    }
    setShowPicker(!showPicker)
  }

  return (
    <SafeAreaView className="flex flex-col justify-center px-14 h-full">
      <ThemedText type="defaultSemiBold">Date</ThemedText>
      <Controller
        name="date"
        control={form.control}
        render={({ field }) => (
          <View className="flex flex-row">
            {showPicker &&
                <RNDateTimePicker
                    value={new Date(field.value)}
                    onChange={onChange} mode="time"
                    display="spinner"
                    is24Hour={true}
                />
            }
            <Text
              className="border border-gray-400 rounded-l-xl p-2">{format(field.value, "HH:mm:ss dd-MM-yyyy")}</Text>
            <Pressable className="p-2 bg-blue-500 hover:bg-blue-400 w-40 rounded-r-xl"
                       onPress={() => setShowPicker((state) => !state)}>
              <Text className="m-auto text-lg font-semibold text-white">Set time</Text>
            </Pressable>
          </View>

        )}
      />
      <ThemedText type="defaultSemiBold">Blood pressure</ThemedText>
      <Controller
        name="bloodPressure"
        control={form.control}
        render={({ field }) => (
          <NumberInput field={field} errorMessage={form.formState.errors.bloodPressure?.message}/>
        )}
      />
      <Button onPress={form.handleSubmit(onSubmit)} title={"Save"}/>
    </SafeAreaView>
  )
}