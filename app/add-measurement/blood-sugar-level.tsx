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
  bloodSugarLevel: number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive('Blood pressure must be a positive number')
    .required('Blood pressure is required'),
  date: date().required(),
})

type BloodSugarLevelRequest = InferType<typeof schema>;

const defaultValues = { bloodSugarLevel: undefined, date: new Date() };

export default function BloodSugarLevel() {
  const form = useForm<BloodSugarLevelRequest>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onTouched"
  })

  const onSubmit = (request: BloodSugarLevelRequest) => {
    console.log(request);
  }

  return (
    <>
      <Stack.Screen options={{
        title: 'Add blood sugar level',
        headerStyle: {
          backgroundColor: '#ea580c',
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
          name="bloodSugarLevel"
          control={form.control}
          render={({ field }) => (
            <NumberInput field={field} errorMessage={form.formState.errors.bloodSugarLevel?.message}/>
          )}
        />
        <Button onPress={form.handleSubmit(onSubmit)} title={"Save"}/>
      </ThemedSaveAreaView>
    </>
  )
}