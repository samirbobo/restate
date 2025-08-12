import { View, Text, Image } from "react-native";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";

const Location = ({ data }: any) => {
  return (
    <View className="mt-8">
      <Text className="font-rubik-semibold text-xl text-black-300">
        Location
      </Text>

      <View className="flex flex-row items-center gap-x-2 mt-3">
        <Image source={icons.location} className="size-5" />
        <Text className="font-rubik-medium text-base text-black-200">
          {data?.address}
        </Text>
      </View>

      <View className="mt-3">
        <Image
          source={images.map}
          className="w-full h-[200px]"
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default Location;
