import HouseDetails from "@/components/HouseDetails";
import AgentDetials from "@/components/propertyDetails/AgentDetials";
import Facilities from "@/components/propertyDetails/Facilities";
import Gallery from "@/components/propertyDetails/Gallery";
import GalleryDetails from "@/components/propertyDetails/GalleryDetails";
import Location from "@/components/propertyDetails/Location";
import PropertyHeader from "@/components/propertyDetails/PropertyHeader";
import ReviewsDetails from "@/components/propertyDetails/ReviewsDetails";
import icons from "@/constants/icons";
import { getPropertyById } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Property = () => {
  const [barStyle, setBarStyle] = useState<"transparent" | "black">(
    "transparent"
  );
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
      edges={[
        "left",
        "right",
        "bottom",
        ...(data?.gallery.length < 1 ? ["top" as const] : []),
      ]}
    >
      {data?.gallery.length > 0 && (
        <StatusBar
          translucent
          backgroundColor={barStyle}
          barStyle="light-content"
        />
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {data?.gallery.length > 0 ? (
          <View className="relative h-[460px]">
            <Gallery data={data} />
          </View>
        ) : (
          <PropertyHeader style={{ paddingTop: 10, paddingHorizontal: 10 }} />
        )}

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
          <AgentDetials data={data} />

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
          {data?.facilities.length > 0 && <Facilities data={data} />}

          {/* Gallery */}
          {data?.gallery.length > 0 && <GalleryDetails data={data} />}

          {/* Location */}
          <Location data={data} />

          {/* reviews */}
          {data?.reviews.length > 0 && <ReviewsDetails data={data} />}
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
