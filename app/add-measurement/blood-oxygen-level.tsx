import { ThemedText } from "@/components/ThemedText";
import { Stack } from "expo-router";
import ThemedSaveAreaView from "@/components/ThemedSaveAreaView";
import { date, InferType, number, object } from "yup";
import useDatePicker from "@/hooks/useDatePicker";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "@/components/inputs/DatePicker";
import NumberInput from "@/components/inputs/NumberInput";
import { Button } from "react-native";

const schema = object({
  bloodOxygenLevel: number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive('Blood pressure must be a positive number')
    .required('Blood pressure is required'),
  date: date().required(),
})

type BloodOxygenLevelRequest = InferType<typeof schema>;

const defaultValues = { bloodOxygenLevel: undefined, date: new Date() };

export default function BloodOxygenLevel() {
  const { showPicker, changeShowPicker, onChange } = useDatePicker()

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
          backgroundColor: '#2563eb', // Change to your desired color
        },
      }}/>
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