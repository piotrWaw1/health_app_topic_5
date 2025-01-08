import "@/utils/init-axios"
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import "../global.css"
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StorageProvider } from "@/context/StorageContext";
import { SessionProvider } from "@/context/SessionContext";
import * as Notifications from 'expo-notifications';
import CameraComponent from "@/components/lab4/CameraComponent";
import LocationComponents from "@/components/lab4/LocationComponents";
import ContactsComponent from "@/components/lab4/ContactsComponent";
import { View } from "react-native";
import RecordComponent from "@/components/lab4/audio/RecordComponent";


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync().then();


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    const requestNotificationPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        console.log('Notification permissions granted!');
      } else {
        console.log('Notification permissions denied.');
      }
    };

    requestNotificationPermission().then();

    if (loaded) {
      SplashScreen.hideAsync().then();
    }

    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    return () => subscription.remove();

  }, [loaded]);

  if (!loaded) {
    return null;
  }


  return (
    <SessionProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SafeAreaProvider>
          <StorageProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
              <Stack.Screen name="+not-found"/>
            </Stack>
            {/*<CameraComponent/>*/}
            {/*<LocationComponents/>*/}
            {/*<ContactsComponent/>*/}
            {/*<RecordComponent/>*/}
          </StorageProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

