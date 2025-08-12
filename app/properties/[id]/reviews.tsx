import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/lib/useAppwrite";
import { getPropertyById } from "@/lib/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";

export default function ReviewsPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, loading } = useAppwrite({
    fn: getPropertyById,
    params: { propertyId: id },
  });

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
      <FlatList
        data={data?.reviews}
        keyExtractor={(item) => item.$id}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-5 mt-5"
        renderItem={({ item }) => (
          <>
            <View className="flex flex-row items-center gap-x-2.5 mt-5">
              <Image
                source={{ uri: item?.avatar }}
                className="size-10 rounded-full"
              />
              <Text className="font-rubik-semibold text-base text-black-300">
                {item?.name}
              </Text>
            </View>
            <Text className="font-rubik text-base text-black-200 mt-3">
              {item?.review}
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
          </>
        )}
        ListHeaderComponent={() => (
          <View className="flex flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
            >
              <Image source={icons.backArrow} className="size-5" />
            </TouchableOpacity>
            <View className="flex flex-row items-center gap-3">
              <Image source={icons.star} className="size-6" />
              <Text className="font-rubik-semibold text-xl text-black-300">
                {data?.rating} ({data?.reviews.length} Reviews)
              </Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View className="h-[1px] bg-primary-200 mx-2 mt-5" />
        )}
      />
    </SafeAreaView>
  );
}
