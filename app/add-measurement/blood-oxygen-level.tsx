import { ThemedText } from "@/components/ThemedText";
import { Stack } from "expo-router";
import ThemedSaveAreaView from "@/components/ThemedSaveAreaView";
import { date, InferType, number, object } from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "@/components/inputs/DatePicker";
import NumberInput from "@/components/inputs/NumberInput";
import { Button } from "react-native";

const schema = object({
  bloodOxygenLevel: number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive('Blood oxygen must be a positive number')
    .required('Blood oxygen is required'),
  date: date().required(),
})

type BloodOxygenLevelRequest = InferType<typeof schema>;

const defaultValues = { bloodOxygenLevel: undefined, date: new Date() };

export default function BloodOxygenLevel() {
  const form = useForm<BloodOxygenLevelRequest>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onTouched"
  })

  const onSubmit = (request: BloodOxygenLevelRequest) => {
    console.log(request);
  }

  return (
    <>
      <Stack.Screen options={{
        title: 'Add blood oxygen level',
        headerStyle: {
          backgroundColor: '#2563eb',
        },
        headerTintColor: '#ffffff',
      }}/>
      <ThemedSaveAreaView>
        <ThemedText type="defaultSemiBold">Date</ThemedText>
        <Controller
          name="date"
          control={form.control}
          render={({ field }) => (
            <DatePicker field={field} fieldName={"date"} form={form}/>
          )}
        />
        <ThemedText type="defaultSemiBold">Blood oxygen level</ThemedText>
        <Controller
          name="bloodOxygenLevel"
          control={form.control}
          render={({ field }) => (
            <NumberInput field={field} errorMessage={form.formState.errors.bloodOxygenLevel?.message}/>
          )}
        />
        <Button onPress={form.handleSubmit(onSubmit)} title={"Save"}/>
      </ThemedSaveAreaView>
    </>
  )
}