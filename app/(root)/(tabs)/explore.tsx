import { Card } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResult from "@/components/NoResult";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getPropertites } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Explore() {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: properties,
    loading: propertiesLoading,
    refetch,
  } = useAppwrite({
    fn: getPropertites,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    },
    skip: true,
  });

  useEffect(() => {
    // Refetch properties when filter or query changes
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    });
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={properties}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-5"
        columnWrapperClassName="flex gap-4"
        ListEmptyComponent={
          propertiesLoading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <NoResult />
          )
        }
        ListHeaderComponent={() => (
          <>
            {/* Header of Page */}
            <View className="flex flex-row justify-between items-center mt-5">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>

              <Text className="flex-1 text-center font-rubik-medium text-base text-black-300">
                Search for Your Ideal Home
              </Text>

              <Image source={icons.bell} className="size-5" />
            </View>

            {/* Search Component */}
            <Search />

            {/* Filters Component */}
            <View className="mt-5">
              <Filters />

              <Text className="font-rubik-semibold text-black-300 text-xl mt-5">
                Found {properties?.length} Apartments
              </Text>
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
}
