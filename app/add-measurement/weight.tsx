import ThemedSaveAreaView from "@/components/ThemedSaveAreaView";
import { ThemedText } from "@/components/ThemedText";
import { Stack } from "expo-router";
import { date, InferType, number, object } from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "@/components/inputs/DatePicker";
import NumberInput from "@/components/inputs/NumberInput";
import { Button } from "react-native";
import { useStorageContext } from "@/context/StorageContext";
import { DataKeys } from "@/types/DataKeys";

const schema = object({
  weight: number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive('Weight must be a positive number')
    .required('Weight is required'),
  date: date().required(),
})

type WeightRequest = InferType<typeof schema>;

const defaultValues = { weight: undefined, date: new Date() };

export default function Weight() {
  const { setItem } = useStorageContext()
  const form = useForm<WeightRequest>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onTouched"
  })

  const onSubmit = (request: WeightRequest) => {
    const { weight, date } = request;
    setItem(DataKeys.weight, { value: weight, date: date })
  }

  return (
    <>
      <Stack.Screen options={{
        title: 'Add weight',
        headerStyle: {
          backgroundColor: '#16a34a',
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
        <ThemedText type="defaultSemiBold">Weight</ThemedText>
        <Controller
          name="weight"
          control={form.control}
          render={({ field }) => (
            <NumberInput field={field} errorMessage={form.formState.errors.weight?.message}/>
          )}
        />
        <Button onPress={form.handleSubmit(onSubmit)} title={"Save"}/>
      </ThemedSaveAreaView>
    </>
  )
}