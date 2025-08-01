import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global-provider";
import seed from "@/lib/seed";
import {
  Button,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useGlobalContext();

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={[1, 2, 3, 4]} // Example data, replace with actual data source
        renderItem={({ item }) => <Card />}
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-5"
        columnWrapperClassName="flex gap-4"
        ListHeaderComponent={() => (
          <>
          <Button onPress={seed} title="Seed" />
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

              <TouchableOpacity>
                <Text className="text-base font-rubik-bold text-primary-300">
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            {/* Featured Cards */}
            <FlatList
              data={[1, 2, 3, 4]} // Example data, replace with actual data source
              renderItem={({ item }) => <FeaturedCard />}
              horizontal
              showsHorizontalScrollIndicator={false}
              bounces={false}
              keyExtractor={(item) => item.toString()}
              contentContainerClassName="flex gap-5"
            />

            {/* Header of Cards */}
            <View className="flex flex-row items-center justify-between mt-5">
              <Text className="font-rubik-bold text-xl text-black-300">
                Our Recommendations
              </Text>

              <TouchableOpacity>
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
