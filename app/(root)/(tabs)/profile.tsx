import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import SettingsItem from "@/components/SettingsItem";
import { settings } from "@/constants/data";
import { useGlobalContext } from "@/lib/global-provider";
import { logout } from "@/lib/appwrite";

const Profile = () => {
  const { user, refetch } = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert("Success", "Logged out successfully");
      refetch();
    } else {
      Alert.alert("Error", "Failed to logout");
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        {/* Profile Header */}
        <View className="flex flex-row justify-between items-center mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>

        {/* image and name of user */}
        <View className=" flex flex-col items-center mt-10">
          <View className="relative">
            <Image
              source={{ uri: user?.avatar }}
              className="size-44 rounded-full"
            />
            <TouchableOpacity className="absolute bottom-0 right-2">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>
          </View>
          <Text className="text-2xl font-rubik-bold capitalize text-center mt-2">
            {user?.name}
          </Text>
        </View>

        {/* Settings Items */}
        <View className="flex flex-col mt-10 pt-5 border-t border-primary-200">
          <SettingsItem icon={icons.calendar} title="My Booking" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>

        {/* Other Settings Items */}
        <View className="flex flex-col mt-5 pt-5 border-t border-primary-200">
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        {/* Logout Button */}
        <View className="flex flex-col mt-5 pt-5 border-t border-primary-200">
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            onPress={handleLogout}
            textStyle="text-danger"
            showArrow={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
