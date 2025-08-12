import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import icons from "@/constants/icons";

const AgentDetials = ({ data }: any) => {
  return (
    <View>
      <Text className="font-rubik-semibold text-xl text-black-300 mb-4">
        Agent
      </Text>

      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center gap-x-5">
          <Image
            source={{ uri: data?.agent?.avatar }}
            className="size-16 rounded-full"
          />
          <View className="flex flex-col gap-y-1">
            <Text className="font-rubik-semibold text-lg text-black-300">
              {data?.agent?.name}
            </Text>
            <Text className="font-rubik-medium text-sm text-black-200">
              Owner
            </Text>
          </View>
        </View>
        <View className="flex flex-row items-center gap-x-5">
          <TouchableOpacity>
            <Image source={icons.chat} className="size-7" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={icons.phone} className="size-7" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AgentDetials;
