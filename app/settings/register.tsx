import { ThemedText } from "@/components/ThemedText";
import { Stack } from "expo-router";
import ThemedSaveAreaView from "@/components/ThemedSaveAreaView";
import { InferType, object, string } from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextInput } from "react-native";
import { cn } from "@/components/utils/cn";
import { useThemeColor } from "@/hooks/useThemeColor";
import axios from "axios";

const schema = object({
  email: string().email().required(),
  password: string().required(),
  repeatPassword: string().required(),
})

type LoginRequest = InferType<typeof schema>;

const defaultValues = { email: "", password: "" };

export default function Register() {
  const backgroundColor = useThemeColor({}, 'background');

  const form = useForm<LoginRequest>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onTouched"
  })

  const onSubmit = async (request: LoginRequest) => {
    try {
      const { data } = await axios.post("/register", request)
      console.log(data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
      }
    }
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
        <ThemedText type="defaultSemiBold">E-mail address</ThemedText>
        <Controller
          name="email"
          control={form.control}
          render={({ field }) => (
            <TextInput
              {...field}
              onChangeText={field.onChange}
              keyboardType="email-address"
              className={cn("border border-gray-400 rounded-xl px-2 my-2", backgroundColor === "#151718" ? "text-white" : "text-black")}
            />
          )}
        />
        <ThemedText type="defaultSemiBold">Password</ThemedText>
        <Controller
          name="password"
          control={form.control}
          render={({ field }) => (
            <TextInput
              {...field}
              secureTextEntry
              onChangeText={field.onChange}
              className={cn("border border-gray-400 rounded-xl px-2 my-2", backgroundColor === "#151718" ? "text-white" : "text-black")}
            />
          )}
        />
        <ThemedText type="defaultSemiBold">Repeat password</ThemedText>
        <Controller
          name="repeatPassword"
          control={form.control}
          render={({ field }) => (
            <TextInput
              {...field}
              secureTextEntry
              onChangeText={field.onChange}
              className={cn("border border-gray-400 rounded-xl px-2 my-2", backgroundColor === "#151718" ? "text-white" : "text-black")}
            />
          )}
        />
        <Button onPress={form.handleSubmit(onSubmit)} title={"Login"}/>
      </ThemedSaveAreaView>
    </>
  )
}