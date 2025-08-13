import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import signLogo from "../assets/images/onboarding.png";
import google from "../assets/icons/google.png";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";

const Auth = () => {
  const { refetch, loading, isLogged } = useGlobalContext();

  const handleLogin = async () => {
    const result = await login();
    if (result) {
      refetch();
    } else {
      Alert.alert("Error", "Failed to login");
    }
  };

  if (!loading && isLogged) return <Redirect href="/" />;

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="pb-32 h-full">
        <Image
          source={signLogo}
          className="w-full h-2/3"
          resizeMode="contain"
        />
        <View className="px-10">
          <Text className="font-rubik text-base text-center uppercase text-black-200 tracking-[1px]">
            Welcome to Real Scout
          </Text>

          <Text className="font-rubik-bold text-[32px] text-black-300 text-center mt-2">
            {"Let's"} Get You Closer To
            <Text className="text-primary-300"> Your Ideal Home</Text>
          </Text>
          <Text className="font-rubik text-center text-lg text-black-200 mt-8">
            Login to Real Scout with Google
          </Text>

          <TouchableOpacity
            onPress={handleLogin}
            className="bg-white rounded-full shadow-md shadow-zinc-300 w-full py-4 mt-5"
          >
            <View className="flex flex-row justify-center items-center">
              <Image source={google} className="w-5 h-5" resizeMode="contain" />
              <Text className="ml-2 font-rubik-medium text-lg text-black-300">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Auth;
