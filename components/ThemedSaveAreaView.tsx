import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { cn } from "@/components/utils/cn";
import { ReactNode } from "react";

interface ThemedSaveAreaViewProps {
  className?: string;
  children?: ReactNode;
}

export default function ThemedSaveAreaView(props: ThemedSaveAreaViewProps) {
  const { className, children } = props
  const backgroundColor = useThemeColor({}, 'background');

  return (
    <SafeAreaView className={cn("flex justify-center px-14 h-full bg-white", className)} style={[{ backgroundColor }]}>
      {children}
    </SafeAreaView>
  )
}