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
import DatePicker from "@/components/inputs/DatePicker";

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

  const changeShowPicker = () => {
    setShowPicker(!showPicker);
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
    changeShowPicker()
  }

  return (
    <SafeAreaView className="flex flex-col justify-center px-14 h-full">
      <ThemedText type="defaultSemiBold">Date</ThemedText>
      <Controller
        name="date"
        control={form.control}
        render={({ field }) => (
          <DatePicker
            changeShowPicker={changeShowPicker}
            showPicker={showPicker}
            field={field}
            onChange={onChange}
          />
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