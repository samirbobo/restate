import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResult from "@/components/NoResult";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getLatestProperties, getPropertites } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
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

export default function Index() {
  const { user } = useGlobalContext();

  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });

  const {
    data: properties,
    loading: propertiesLoading,
    refetch,
  } = useAppwrite({
    fn: getPropertites,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });

  useEffect(() => {
    // Refetch properties when filter or query changes
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
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
              <View className="flex flex-row items-center gap-[10px]">
                <Image
                  source={{ uri: user?.avatar }}
                  className="size-11 rounded-full"
                  resizeMode="contain"
                />

                <View>
                  <Text className="font-rubik text-xs capitalize text-black-100">
                    Good Morning
                  </Text>
                  <Text className="text-base font-rubik-medium text-black-300">
                    {user?.name}
                  </Text>
                </View>
              </View>

              <Image source={icons.bell} className="size-5" />
            </View>

            {/* Search Component */}
            <Search />

            {/* Header of Featured Cards */}
            <View className="flex flex-row items-center justify-between my-5">
              <Text className="font-rubik-bold text-xl text-black-300">
                Featured
              </Text>

              <TouchableOpacity onPress={() => router.push("/explore")}>
                <Text className="text-base font-rubik-bold text-primary-300">
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            {/* Featured Cards */}
            {latestPropertiesLoading ? (
              <ActivityIndicator size="large" className="text-primary-300" />
            ) : !latestProperties || latestProperties?.length === 0 ? (
              <NoResult />
            ) : (
              <FlatList
                data={latestProperties}
                renderItem={({ item }) => (
                  <FeaturedCard
                    item={item}
                    onPress={() => handleCardPress(item.$id)}
                  />
                )}
                keyExtractor={(item) => item.$id}
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                contentContainerClassName="flex gap-5"
              />
            )}

            {/* Header of Cards */}
            <View className="flex flex-row items-center justify-between mt-5">
              <Text className="font-rubik-bold text-xl text-black-300">
                Our Recommendations
              </Text>

              <TouchableOpacity onPress={() => router.push("/explore")}>
                <Text className="text-base font-rubik-bold text-primary-300">
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            <Filters />
          </>
        )}
      />
    </SafeAreaView>
  );
}
