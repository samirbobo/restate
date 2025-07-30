import { Card, FeaturedCard } from "@/components/Cards";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global-provider";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useGlobalContext();

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-5"
      >
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
        <View className="flex flex-row items-start gap-5">
          <FeaturedCard />
          <FeaturedCard />
        </View>

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

        {/* Cards */}
        <View className="flex flex-row gap-2">
          <Card />
          <Card />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
