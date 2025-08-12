import { View, Text, Image } from "react-native";
import React from "react";
import { facilitiesIcons } from "@/constants/data";

const Facilities = ({ data }: any) => {
  return (
    <View className="mt-8">
      <Text className="font-rubik-semibold text-xl text-black-300">
        Facilities
      </Text>
      <View
        className="flex flex-row items-center mt-3"
        style={{ flexWrap: "wrap" }}
      >
        {data?.facilities.map((facility: string, index: number) => {
          const matchedIcon = facilitiesIcons.find(
            (item) => item.title.toLowerCase() === facility.toLowerCase()
          );
          return (
            <View
              key={index}
              className="flex flex-col gap-y-2 items-center"
              style={{
                width: "23%",
                marginRight: (index + 1) % 4 === 0 ? 0 : "2%",
                marginBottom: 16,
              }}
            >
              <View className="flex flex-row items-center justify-center size-16 bg-primary-100 rounded-full">
                <Image source={matchedIcon?.icon} className="size-7" />
              </View>
              <Text
                className="font-rubik text-base text-black-300"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {facility}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Facilities;
