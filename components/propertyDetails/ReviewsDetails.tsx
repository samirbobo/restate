import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import icons from "@/constants/icons";
import { router, useLocalSearchParams } from "expo-router";

const ReviewsDetails = ({ data }: { data: any }) => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View className="mt-8">
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center gap-3">
          <Image source={icons.star} className="size-6" />
          <Text className="font-rubik-semibold text-xl text-black-300">
            {data?.rating} ({data?.reviews.length} Reviews)
          </Text>
        </View>

        {data?.reviews.length > 1 && (
          <TouchableOpacity
            onPress={() => router.push(`/properties/${id}/reviews`)}
          >
            <Text className="text-base font-rubik-semibold text-primary-300">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View className="flex flex-row items-center gap-x-2.5 mt-5">
        <Image
          source={{ uri: data?.reviews[0]?.avatar }}
          className="size-10 rounded-full"
        />
        <Text className="font-rubik-semibold text-base text-black-300">
          {data?.reviews[0]?.name}
        </Text>
      </View>

      <Text className="font-rubik text-base text-black-200 mt-3">
        {data?.reviews[0]?.review}
      </Text>

      <View className="flex flex-row items-center justify-between mt-2">
        <View className="flex flex-row items-center gap-x-1.5">
          <Image source={icons.heart} className="size-5" tintColor="#0061FF" />
          <Text className="font-rubik-medium text-sm text-black-300">938</Text>
        </View>

        <Text className="font-rubik text-sm text-black-100">6 days ago</Text>
      </View>
    </View>
  );
};

export default ReviewsDetails;
