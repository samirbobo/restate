import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import images from "@/constants/images";

const GalleryDetails = ({ data }: any) => {
  return (
    <View className="mt-8">
      <Text className="font-rubik-semibold text-xl text-black-300">
        Gallery
      </Text>
      <View className="flex flex-row items-center justify-between mt-5">
        {data?.gallery
          .slice(0, 3)
          .map(({ image }: { image: string }, index: number) => {
            const isLastItem = data?.gallery.length > 3;

            if (isLastItem) {
              return (
                <TouchableOpacity
                  key={index}
                  style={{ width: "32%", position: "relative" }}
                >
                  <Image
                    source={{ uri: image }}
                    className="w-full h-[118px] rounded-[10px]"
                    resizeMode="cover"
                  />

                  <Image
                    source={images.cardGradient}
                    className="size-full rounded-2xl absolute bottom-0"
                  />

                  <Text className="text-white z-10 font-rubik-bold text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {data?.gallery.length}+
                  </Text>
                </TouchableOpacity>
              );
            }

            return (
              <View key={index} style={{ width: "32%" }}>
                <Image
                  source={{ uri: image }}
                  className="w-full h-[118px] rounded-[10px]"
                  resizeMode="cover"
                />
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default GalleryDetails;
