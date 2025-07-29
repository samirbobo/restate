import { SplashScreen, Stack } from "expo-router";
import "./global.css";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { GlobalProvider } from "@/lib/global-provider";

export default function RootLayout() {
  // .ttf هوك من اكسبو تسمح لك بتحميل خطوط مخصصة من ملفات  بسهولة.
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      // للتحكم في شاشة التحميل يدويًا — نقدر نخليها تفضل ظاهرة لحد ما الخطوط تتحمل. بمجرد ما الخط يتحمل الشاشه ديه بتختفي علطول
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // لو الخطوط لسه ما اتحملت، ما يعرضش أي حاجة عشان تتجنب وميض الخط الافتراضي.
  if (!fontsLoaded) return null;

  return (
    <GlobalProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </GlobalProvider>
  );
}
