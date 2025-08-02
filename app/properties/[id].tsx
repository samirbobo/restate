import HouseDetails from "@/components/HouseDetails";
import { facilitiesIcons } from "@/constants/data";
import icons from "@/constants/icons";
import { getPropertyById } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Property = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, loading } = useAppwrite({
    fn: getPropertyById,
    params: { propertyId: id },
  });

  console.log(data);

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
    <SafeAreaView className="bg-white h-full">
      <ScrollView className="pb-32 px-5">
        {/* House Detials */}

        <View className="mt-3">
          <Text className="font-rubik-bold text-2xl text-black-300">
            {data?.name}
          </Text>

          <View className="flex flex-row items-center gap-2.5 mt-3">
            <Text className="bg-primary-100 py-1.5 px-2.5 rounded-[20px] font-rubik-semibold text-xs uppercase text-primary-300">
              {data?.type}
            </Text>
            <View className="flex flex-row items-center gap-1.5">
              <Image source={icons.star} className="size-5" />
              <Text className="font-rubik-medium text-sm text-black-200">
                {data?.rating}
                {data?.reviews?.length > 0 && (
                  <> ({data?.reviews?.length} reviews) </>
                )}
              </Text>
            </View>
          </View>

          <View className="flex flex-row items-center gap-6 mt-3">
            <HouseDetails image={icons.bed} data={data?.bedrooms} text="Beds" />
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
            <View className="flex flex-row items-center gap-5">
              <Image
                source={{ uri: data?.agent?.avatar }}
                className="size-16 rounded-full"
              />
              <View className="flex flex-col gap-1">
                <Text className="font-rubik-semibold text-lg text-black-300">
                  {data?.agent?.name}
                </Text>
                <Text className="font-rubik-medium text-sm text-black-200">
                  Owner
                </Text>
              </View>
            </View>
            <View className="flex flex-row items-center gap-5">
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
                  className="flex flex-col gap-2 items-center"
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Property;
