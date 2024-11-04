import ThemedSaveAreaView from "@/components/ThemedSaveAreaView";
import { ThemedText } from "@/components/ThemedText";
import { Stack } from "expo-router";
import { date, InferType, number, object } from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "@/components/inputs/DatePicker";
import NumberInput from "@/components/inputs/NumberInput";
import { Button } from "react-native";
import useDatePicker from "@/hooks/useDatePicker";

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
  const { showPicker, changeShowPicker, onChange } = useDatePicker()

  const form = useForm<WeightRequest>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onTouched"
  })

  const onSubmit = (request: WeightRequest) => {
    console.log(request);
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Add weight' }}/>
      <ThemedSaveAreaView>
        <ThemedText type="defaultSemiBold">Date</ThemedText>
        <Controller
          name="date"
          control={form.control}
          render={({ field }) => (
            <DatePicker
              changeShowPicker={changeShowPicker}
              showPicker={showPicker}
              field={field}
              onChange={(event, date) => onChange(form, "date", event, date)}
            />
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