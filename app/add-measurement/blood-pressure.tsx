import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ThemedText } from "@/components/ThemedText";
import DatePicker from "@/components/inputs/DatePicker";
import NumberInput from "@/components/inputs/NumberInput";
import { Button } from "react-native";
import { date, InferType, number, object } from "yup";
import { Stack } from "expo-router";
import ThemedSaveAreaView from "@/components/ThemedSaveAreaView";
import useDatePicker from "@/hooks/useDatePicker";

const schema = object({
  bloodPressure: number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive('Blood pressure must be a positive number')
    .required('Blood pressure is required'),
  date: date().required(),
})

type BloodPressure = InferType<typeof schema>;

const defaultValues = { bloodPressure: undefined, date: new Date() };

export default function BloodPressure() {
  const { showPicker, changeShowPicker, onChange } = useDatePicker()

  const form = useForm<BloodPressure>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onTouched"
  })

  const onSubmit = (request: BloodPressure) => {
    console.log(request);
  }

  return (
    <>
      <Stack.Screen options={{
        title: 'Add blood pressure',
        headerStyle: {
          backgroundColor: '#dc2626', // Change to your desired color
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
        <ThemedText type="defaultSemiBold">Blood pressure</ThemedText>
        <Controller
          name="bloodPressure"
          control={form.control}
          render={({ field }) => (
            <NumberInput field={field} errorMessage={form.formState.errors.bloodPressure?.message}/>
          )}
        />
        <Button onPress={form.handleSubmit(onSubmit)} title={"Save"}/>
      </ThemedSaveAreaView>
    </>
  )
}
