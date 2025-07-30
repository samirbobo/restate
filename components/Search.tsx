import { useState } from "react";
import { View, Image, TextInput, TouchableOpacity } from "react-native";
import icons from "@/constants/icons";
import { router, useLocalSearchParams } from "expo-router";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query);

  // الفانكشن ديه مستدعاء من من مكتبه خارجيه وبتخلني ابعت طلب للباك اند بعد نص ثانيه من توقف المستخدم من كتابه المنتج الي بيبحث عنه
  const debouncedSearch = useDebouncedCallback((text: string) => {
    router.setParams({ query: text });
  }, 500);

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return (
    <View className="flex flex-row items-center justify-between bg-accent-100 px-4 py-2 mt-5 w-full border border-primary-100 rounded-lg">
      <View className="flex-1 flex flex-row items-center justify-start z-50">
        <Image source={icons.search} className="size-5" />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for anything"
          className="text-sm font-rubik text-black-300 ml-4 flex-1"
        />
      </View>

      <TouchableOpacity>
        <Image source={icons.filter} className="size-5" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
