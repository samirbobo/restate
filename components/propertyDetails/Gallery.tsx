import { useRef } from "react";
import { Animated, Dimensions, Image, View } from "react-native";
import PropertyHeader from "./PropertyHeader";

const { width } = Dimensions.get("window");

export default function Gallery({ data }: any) {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <>
      <Animated.FlatList
        data={data?.gallery.slice(0, 5)}
        horizontal
        pagingEnabled
        keyExtractor={(item) => item.$id}
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item }) => (
          <View style={{ width, height: 460, position: "relative" }}>
            <Image
              source={{ uri: item.image }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
            <PropertyHeader
              style={{ position: "absolute", top: 50, left: 20, right: 20 }}
            />
          </View>
        )}
      />

      {/* Animated Dots */}
      {data?.gallery.length > 1 && (
        <View
          style={{
            position: "absolute",
            bottom: 20,
            left: 0,
            right: 0,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data?.gallery
            .slice(0, 5)
            .map((_: { image: string; $id: string }, index: number) => {
              const inputRange = [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ];

              const dotWidth = scrollX.interpolate({
                inputRange,
                outputRange: [8, 32, 8],
                extrapolate: "clamp",
              });

              const backgroundColor = scrollX.interpolate({
                inputRange,
                outputRange: ["#fff", "#0061FF", "#fff"],
                extrapolate: "clamp",
              });

              return (
                <Animated.View
                  key={index}
                  style={{
                    width: dotWidth,
                    height: 8,
                    borderRadius: 100,
                    backgroundColor,
                    marginHorizontal: 6,
                  }}
                />
              );
            })}
        </View>
      )}
    </>
  );
}
