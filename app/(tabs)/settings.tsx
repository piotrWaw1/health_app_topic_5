import ThemedSaveAreaView from "@/components/ThemedSaveAreaView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { cn } from "@/components/utils/cn";
import { View } from "react-native";
import { useSessionContext } from "@/context/SessionContext";

const defaultClassLink = "text-white text-center p-2 rounded-xl font-bold text-lg"

export default function Settings() {
  const { token, removeToken } = useSessionContext()

  return (
    <ThemedSaveAreaView>
      <ThemedText type="title">Settings</ThemedText>
      <View className="gap-4 mt-5">
        {!token &&
            <>
                <Link className={cn(defaultClassLink, "bg-blue-600")} href="/settings/login">
                    Login
                </Link>
                <Link className={cn(defaultClassLink, "bg-cyan-600")} href="/settings/register">
                    Register
                </Link>
            </>
          ||
            <Link className={cn(defaultClassLink, "bg-orange-600")} onPress={removeToken} href="/">
                Log out
            </Link>
        }
      </View>
    </ThemedSaveAreaView>
  )
}