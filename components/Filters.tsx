import { categories } from "@/constants/data";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, ScrollView, TouchableOpacity } from "react-native";

const Filters = () => {
  const params = useLocalSearchParams<{ filter: string }>();
  const [selectedCategory, setselectedCategory] = useState<string>(
    params.filter || "All"
  );

  const handleCategoryPress = (category: string) => {
    if (category === selectedCategory) {
      setselectedCategory("All");
      router.setParams({ filter: "All" });
      return;
    }

    setselectedCategory(category);
    router.setParams({ filter: category });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="mt-3"
    >
      {categories.map((item, index) => (
        <TouchableOpacity
          onPress={() => handleCategoryPress(item.category)}
          key={index}
          className={`flex flex-col items-start mr-3 px-5 py-2 rounded-full ${item.category === selectedCategory ? "bg-primary-300" : "bg-primary-100 border border-primary-200"}`}
        >
          <Text
            className={`text-sm ${selectedCategory === item.category ? "font-rubik-bold  text-white mt-0.5" : "font-rubik text-black-300"}`}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Filters;
