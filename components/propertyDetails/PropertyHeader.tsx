import { View, TouchableOpacity, Image, ViewStyle } from "react-native";
import React from "react";
import icons from "@/constants/icons";
import { router } from "expo-router";

const PropertyHeader = ({ style }: { style?: ViewStyle }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        ...style,
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Image
          source={icons.backArrow}
          style={{ width: 28, height: 28 }}
          tintColor="black"
        />
      </TouchableOpacity>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
        <Image
          source={icons.heart}
          style={{ width: 28, height: 28 }}
          tintColor="black"
        />
        <Image
          source={icons.send}
          style={{ width: 28, height: 28 }}
          tintColor="black"
        />
      </View>
    </View>
  );
};

export default PropertyHeader;
