import HouseDetails from "@/components/HouseDetails";
import { facilitiesIcons } from "@/constants/data";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { getPropertyById } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const Property = () => {
  const [barStyle, setBarStyle] = useState<"transparent" | "black">(
    "transparent"
  );
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, loading } = useAppwrite({
    fn: getPropertyById,
    params: { propertyId: id },
  });

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    // Switch to dark-content when scrolled past the hero image (430px)
    setBarStyle(scrollY > 430 ? "black" : "transparent");
  };

  // Handle viewable items change to update the active index. This is used to update the active image in the FlatList
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  }).current;

  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full">
        <ActivityIndicator
          size="large"
          className="flex-1 items-center justify-center text-primary-300"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className="bg-white h-full"
      edges={["left", "right", "bottom"]}
    >
      <StatusBar
        translucent
        backgroundColor={barStyle}
        barStyle="light-content"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View className="relative h-[460px]">
          <FlatList
            data={data?.gallery.slice(0, 3)}
            horizontal
            pagingEnabled
            keyExtractor={(item) => item.$id}
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 50, // Trigger when at least 50% of the item is visible
            }}
            renderItem={({ item }) => (
              <View style={{ width: width, position: "relative", height: 460 }}>
                <Image
                  source={{ uri: item.image }}
                  className="w-full h-full"
                  resizeMode="cover"
                />

                <View className="flex flex-row justify-between absolute top-16 left-5 right-5">
                  <TouchableOpacity onPress={() => router.back()}>
                    <Image
                      source={icons.backArrow}
                      className="size-7"
                      tintColor="black"
                    />
                  </TouchableOpacity>
                  <View className="flex flex-row items-center gap-x-2">
                    <Image
                      source={icons.heart}
                      className="size-7"
                      tintColor="black"
                    />
                    <Image
                      source={icons.send}
                      className="size-7"
                      tintColor="black"
                    />
                  </View>
                </View>
              </View>
            )}
          />
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
            {data?.gallery.slice(0, 3).map((_: any, index: number) => (
              <View
                key={index}
                style={{
                  width: activeIndex === index ? 10 : 8,
                  height: activeIndex === index ? 10 : 8,
                  borderRadius: 5,
                  backgroundColor:
                    activeIndex === index ? "#0061FF" : "#D3D3D3",
                  marginHorizontal: 4,
                }}
              />
            ))}
          </View>
        </View>

        <View className="px-5">
          {/* House Detials */}
          <View className="mt-3">
            <Text className="font-rubik-bold text-2xl text-black-300">
              {data?.name}
            </Text>

            <View className="flex flex-row items-center gap-x-2.5 mt-3">
              <Text className="bg-primary-100 py-1.5 px-2.5 rounded-[20px] font-rubik-semibold text-xs uppercase text-primary-300">
                {data?.type}
              </Text>
              <View className="flex flex-row items-center gap-x-1.5">
                <Image source={icons.star} className="size-5" />
                <Text className="font-rubik-medium text-sm text-black-200">
                  {data?.rating}
                  {data?.reviews?.length > 0 && (
                    <> ({data?.reviews?.length} reviews) </>
                  )}
                </Text>
              </View>
            </View>

            <View className="flex flex-row items-center gap-x-6 mt-3">
              <HouseDetails
                image={icons.bed}
                data={data?.bedrooms}
                text="Beds"
              />
              <HouseDetails
                image={icons.bath}
                data={data?.bathrooms}
                text="bath"
              />
              <HouseDetails image={icons.area} data={data?.area} text="sqft" />
            </View>
          </View>

          <View className="h-[1px] w-full bg-primary-200 my-8"></View>

          {/* Agent Detials */}
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

          {/* Description */}
          <View className="mt-8">
            <Text className="font-rubik-semibold text-xl text-black-300">
              Overview
            </Text>
            <Text className="font-rubik text-base text-black-200 mt-3">
              {data?.description}
            </Text>
          </View>

          {/* Facilities */}
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

          {/* Gallery */}
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

          {/* Location */}
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

          {/* reviews */}
          <View className="mt-8">
            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center gap-3">
                <Image source={icons.star} className="size-6" />
                <Text className="font-rubik-semibold text-xl text-black-300">
                  {data?.rating} ({data?.reviews.length} Reviews)
                </Text>
              </View>

              <TouchableOpacity>
                <Text className="text-base font-rubik-semibold text-primary-300">
                  See All
                </Text>
              </TouchableOpacity>
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
                <Image
                  source={icons.heart}
                  className="size-5"
                  tintColor="#0061FF"
                />
                <Text className="font-rubik-medium text-sm text-black-300">
                  938
                </Text>
              </View>

              <Text className="font-rubik text-sm text-black-100">
                6 days ago
              </Text>
            </View>
          </View>
        </View>

        {/* Price */}
        <View className="border border-primary-200 rounded-tl-[36px] rounded-tr-[36px] pt-6 pb-9 px-6 mt-10">
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-col gap-y-1.5">
              <Text className="font-rubik-medium text-xs text-black-200 uppercase">
                Price
              </Text>
              <Text className="font-rubik-semibold text-2xl text-primary-300">
                ${data?.price}
              </Text>
            </View>

            <TouchableOpacity className="bg-primary-300 py-[14px] px-[16px] rounded-[100px] shadow-[4px_8px_24px_0px_#704F3840] min-w-48">
              <Text className="font-rubik-semibold text-base text-white text-center">
                Booking Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Property;
